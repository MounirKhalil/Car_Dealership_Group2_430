from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bcrypt
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import re

load_dotenv()

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'website_data'
app.config['MONGO_URI'] = os.getenv('MONGO_URI')

mongo = PyMongo(app)

####################################################################
################  SIGN IN AND SIGN UP SECTION ######################
####################################################################


@app.route('/signin', methods=['POST'])
def sign_in():
    """
    This function handles user login. It checks the user's credentials and returns a JWT token if the
    credentials are valid. If the user is an admin, it also includes an 'admin' flag in the response.
    """
    email = request.json['email']
    password = request.json['password']

    users_collection = mongo.db.users

    user = users_collection.find_one({'email': email})

    if user:
        hashed_password = user['password']
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
            if user.get('admin'):
                token = jwt.encode({
                    'user': email,
                    'exp': datetime.utcnow() + timedelta(minutes=30)
                }, os.getenv('SECRET_KEY'))
                return jsonify({'token': token.decode('utf-8'), 'admin': True})
            else:
                return jsonify({'error': 'You do not have permission to access the admin panel'})
    return jsonify({'error': 'Invalid username or password'})


@app.route('/signup', methods=['POST'])
def sign_up():
    """
    This function handles user registration. It checks if the user already exists,
    checks if the password meets the minimum strength requirements (minimum 8 characters
    with at least one uppercase letter, one lowercase letter, one digit, and one special
    character), and adds a new user to the database if they don't exist.
    """
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    password = request.json['password']
    mobile = request.json['mobile']
    admin = request.json['admin']

    # Check if user already exists
    users_collection = mongo.db.users
    existing_user = users_collection.find_one({'email': email})
    if existing_user:
        return jsonify({'error': 'User already exists'})

    # Check password length
    if not (len(password) >= 8 
    and re.search(r'[A-Z]', password)
    and re.search(r'[a-z]', password)
    and re.search(r'\d', password)
    and re.search(r'[!@#$%^&*(),.?":{}|<>]', password)):
        return jsonify({'error': 'Password must be at least 8 characters and contain at least'
                        'one uppercase letter, one lowercase letter, one digit, and one special'
                        'character'})

    # Hash the password and insert user into the database
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'password': hashed_password,
        'mobile': mobile,
        'admin': admin
    })

    return jsonify({'success': True})

@app.route('/cars', methods=['GET'])
def get_cars():
    #This function gets all the cars from the database and returns them as JSON object.
    cars = []
    for car in mongo.db.cars.find():
        cars.append({
            'id': str(car['_id']),
            'make': car['make'],
            'model': car['model'],
            'year': car['year'],
            'price': car['price'],
            'image': car['image']
        })
    if len(cars) == 0:
        return jsonify({'error': 'No cars found in database'})
    return jsonify(cars)

####################################################################
###########################  CARS SECTION ##########################
####################################################################


@app.route('/cars', methods=['GET'])
def get_cars():
    # This function gets all the cars from the database and returns them as JSON object.
    cars = []
    for car in mongo.db.cars.find():
        cars.append({
            'id': str(car['_id']),
            'make': car['make'],
            'model': car['model'],
            'year': car['year'],
            'price': car['price'],
            'image': car['image']
        })
    if len(cars) == 0:
        return jsonify({'error': 'No cars found in database'})
    return jsonify(cars)


if __name__ == '__main__':
    app.run(debug=True)
