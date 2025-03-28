from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import pytz

app = Flask(__name__)

CORS(app, origins="http://localhost:3000")  # Allow only the frontend URL


DATA = {}

# Load data from JSON file
def load_data():
    global DATA
    with open('seed_data/contributions.json') as f:
        DATA['contribution_data'] = json.load(f)['contributions']

load_data()

@app.route('/')
def root():
    return jsonify({"message": "Arqiva Tech Test 1 - Good Luck!"})

def parse_datetime(date_str):
    """Utility function to parse a datetime string into a timezone-aware datetime object."""
    try:
        # Parsing datetime from the string and converting to UTC
        return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=pytz.UTC)
    except ValueError:
        return None

@app.route('/contributions/', methods=['GET'])
def list_contributions():
    contributions = DATA['contribution_data']
    search_query = request.args.get('searchQuery', '').lower()

    # Search filter
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
                # Regular string search
                contributions = [c for c in contributions if re.search(value, c[f], re.IGNORECASE)]

    # Sorting logic
    order_by = request.args.get('order_by', 'id')
    contributions = sorted(contributions, key=lambda c: c.get(order_by, ''))

    # Pagination
    skip = int(request.args.get('skip', 0))  # Default to 0 if not provided
    limit = int(request.args.get('limit', 30))  
    paginated_contributions = contributions[skip: skip + limit]

    return jsonify({
        "contributions": paginated_contributions,
        "total": len(contributions),
        "skip": skip,
        "limit": limit
    })

# User registration and login
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200))
    phone_number = db.Column(db.String(15))

# Ensure tables are created
with app.app_context():
    db.create_all()

# Route for registering a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    address = data.get('address', '')
    phone_number = data.get('phone_number', '')

    # Check if email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    # Create new user without password hashing 
    new_user = User(email=email, password=password, name=name, address=address, phone_number=phone_number)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Route for logging in the user
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user by email (password check is skipped)
    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    # Return user data (excluding password)
    return jsonify({
        'message': 'Login successful',
        'name': user.name,
        'email': user.email,
        'address': user.address,
        'phone_number': user.phone_number
    })

if __name__ == '__main__':
    app.run(debug=True)
