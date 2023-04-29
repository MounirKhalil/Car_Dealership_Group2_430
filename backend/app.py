from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bcrypt
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import re
from flask_cors import CORS, cross_origin
from bson import ObjectId, json_util
import json

load_dotenv()

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'website_data'
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
CORS(app)

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
                return jsonify({'id':  str(user['_id']), 'token': token, 'admin': True, 'success': True})
            else:
                token = jwt.encode({
                    'user': email,
                    'exp': datetime.utcnow() + timedelta(minutes=30)
                }, os.getenv('SECRET_KEY'))
                return jsonify({'id':  str(user['_id']), 'token': token, 'admin': False, 'success': True})
        else:
            return jsonify({'error': 'Invalid username or password'})
    else:
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

    # Check if any attributes are missing
    required_fields = ['first_name', 'last_name',
                       'email', 'password', 'mobile', 'admin']
    for field in required_fields:
        if request.json[field] == "":

            return jsonify({'error': 'Missing field: {}'.format(field)})

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

    # # Check mobile number format
    if not re.match(r'^\d{8}$', mobile):
        return jsonify({'error': 'Mobile number should be 8 digits'})

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


@app.route('/addcars', methods=['POST'])
def add_car():
    car_data = {
        '_id': str(ObjectId()),
        'make': request.json['make'],
        'model': request.json['model'],
        'year': request.json['year'],
        'price': request.json['price'],
        'image': request.json['image']
    }
    mongo.db.cars.insert_one(car_data)
    return 'Car added successfully'


@app.route('/users', methods=['GET'])
def get_users():
    # This function gets all the users from the database and returns them as JSON object.
    users = []
    for user in mongo.db.users.find():
        users.append({
            'first_name': user['first_name'],
            'last_name': user['last_name'],
            'email': user['email'],
            'mobile': user['mobile'],
            'admin': user['admin']
        })
    if len(users) == 0:
        return jsonify({'error': 'No users found in database'})
    return jsonify(users)


@app.route('/delete_car/<car_id>', methods=['DELETE'])
def delete_car(car_id):
    # function that deletes car from database using id
    try:
        mongo.db.cars.delete_one({'_id': ObjectId(car_id)})
        return {'message': 'Car deleted successfully'}
    except:
        return {'error': 'Invalid car ID'}


@app.route('/car/<car_id>', methods=['GET'])
def get_car_info(car_id):
    car = mongo.db.cars.find_one({'_id': ObjectId(car_id)})
    car['_id'] = str(car['_id'])
    if not car:
        return jsonify({'error': 'Car not found'})
    return jsonify(car)

####################################################################
######################### TIMESLOT SECTION #########################
####################################################################


@app.route('/get_reserved_slots', methods=['GET'])
def get_reserved_slots():
    # This function gets all the reserved timeslots from the database and returns them as JSON object.
    timeslots = []
    for timeslot in mongo.db.timeslots.find():
        timeslots.append({
            '_id': str(timeslot['_id']),
            'time': timeslot['time'],
            'userid': timeslot['userid']
        })
    return jsonify(timeslots)


@app.route('/reserve_slot', methods=['POST'])
def reserve_slot():
    timeslot = {
        'time': request.json['time'],
        'userid': request.json['userid']
    }
    mongo.db.timeslots.insert_one(timeslot)
    return 'Timeslot reserved successfully!'


@app.route('/delete_timeslot/<timeslot_id>', methods=['DELETE'])
def delete_timeslot(timeslot_id):
    # function that deletes timeslot from database using id
    try:
        mongo.db.timeslots.delete_one({'_id': ObjectId(timeslot_id)})
        return {'message': 'Timeslot deleted successfully'}
    except:
        return {'error': 'Invalid timeslot ID'}


@app.route('/user/<user_id>', methods=['GET'])
def get_user_info(user_id):
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    user['_id'] = str(user['_id'])
    if not user:
        return jsonify({'error': 'user not found'})
    return json.loads(json_util.dumps(user))


if __name__ == '__main__':
    app.run(debug=True)
