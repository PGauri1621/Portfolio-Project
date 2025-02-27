import os
import json
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # For handling CORS errors

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200))
    phone_number = db.Column(db.String(15))

# Create the database tables
@app.before_first_request
def create_tables():
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

    # Create new user without password hashing (no security)
    new_user = User(email=email, password=password, name=name, address=address, phone_number=phone_number)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Route for logging in the user (no password check)
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

# Route for contributions (read from the contribution.json file)
@app.route('/contributions', methods=['GET'])
def get_contributions():
    # Make sure the contributions.json file exists
    if os.path.exists('seed_data/contributions.json'):
        with open('seed_data/contributions.json', 'r') as file:
            contributions = json.load(file)
            return jsonify(contributions)
    else:
        return jsonify({'message': 'No contributions available'}), 404

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
