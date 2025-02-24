from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# Allow only specific origins for security
CORS(app, origins="http://localhost:3000")  # Allow only the frontend URL

# Simple store of data for this exercise
DATA = {}

# Load data from JSON file
def load_data():
    global DATA
    with open('seed_data/contributions.json') as f:
        DATA['contribution_data'] = json.load(f)['contributions']

# Load data on startup
load_data()

@app.route('/')
def root():
    return jsonify({"message": "Arqiva Tech Test 1 - Good Luck!"})

def parse_datetime(date_str):
    """Utility function to parse a datetime string into a datetime object."""
    try:
        return datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    except ValueError:
        return None

@app.route('/contributions/', methods=['GET'])
def list_contributions():
    contributions = DATA['contribution_data']
    search_query = request.args.get('searchQuery', '').lower()

    if search_query:
        contributions = [c for c in contributions if (
            search_query in c['title'].lower() or
            search_query in c['description'].lower() or
            search_query in c['owner'].lower()
        )]

    # Filtering logic based on additional filters passed in query
    filters = ['id', 'owner', 'title', 'description', 'startBefore', 'startAfter', 'endBefore', 'endAfter']
    for f in filters:
        value = request.args.get(f)
        if value:
            if 'Before' in f or 'After' in f:
                value_dt = parse_datetime(value)
                if value_dt is None:
                    continue  # Skip if datetime parsing failed
                key = 'startTime' if 'start' in f else 'endTime'
                comparator = (lambda c: parse_datetime(c[key]) < value_dt) if 'Before' in f else (lambda c: parse_datetime(c[key]) > value_dt)
                contributions = [c for c in contributions if comparator(c)]
            else:
                contributions = [c for c in contributions if re.search(value, c[f], re.IGNORECASE)]

    # Sorting logic
    order_by = request.args.get('order_by', 'id')
    contributions = sorted(contributions, key=lambda c: c.get(order_by, ''))

    # Pagination: Ensure skip and limit are integers
    skip = int(request.args.get('skip', 0))  # Default to 0 if not provided
    limit = int(request.args.get('limit', 30))  # Default to 30 if not provided
    paginated_contributions = contributions[skip: skip + limit]

    return jsonify({
        "contributions": paginated_contributions,
        "total": len(contributions),
        "skip": skip,
        "limit": limit
    })

# User registration and login (2nd part of your app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Ensure tables are created
with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
