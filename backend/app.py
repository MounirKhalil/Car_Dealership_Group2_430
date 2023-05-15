from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bcrypt
import jwt
from datetime import datetime, timedelta
import os
import re
from flask_cors import CORS, cross_origin
from bson import ObjectId, json_util
import json
from flask_mail import Mail, Message
from waitress import serve
from dotenv import load_dotenv



app = Flask(__name__)

load_dotenv()

app.config['MONGO_DBNAME'] = 'website_data'
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
CORS(app)

app.config['MAIL_SERVER'] = os.environ.get('EMAIL_SERVER')
app.config['MAIL_PORT'] = os.environ.get('EMAIL_PORT')
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

mongo = PyMongo(app)


####################################################################
################  SIGN IN AND SIGN UP SECTION ######################
####################################################################


def send_email(recipients, subject, body):
    try:
        msg = Message(subject, sender=os.environ.get(
            'EMAIL_USERNAME'), recipients=[recipients])
        msg.body = body
        mail.send(msg)
    except Exception as e:
        return str(e)


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
                }, str(os.environ.get('SECRET_KEY')))
                return jsonify({'id':  str(user['_id']), 'token': token, 'admin': True, 'success': True})
            else:
                token = jwt.encode({
                    'user': email,
                    'exp': datetime.utcnow() + timedelta(minutes=30)
                }, os.environ.get('SECRET_KEY'))
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
    user_email = email
    subject = "Welcome to Our Website"
    message = f"Dear {first_name} {last_name},\n\nThank you for signing up on our website. We are glad to have you on board!\n\nBest regards,\nThe Website Team"
    send_email(user_email, subject, message)
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
            'color': car['color'],
            'image': car['image']
        })
    if len(cars) == 0:
        return jsonify({'error': 'No cars found in database'})
    return jsonify(cars)


@app.route('/addcars', methods=['POST'])
def add_car():
    car_data = {
        'make': request.json['make'],
        'model': request.json['model'],
        'year': request.json['year'],
        'price': request.json['price'],
        'color': request.json['color'],
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
    try:
        car = mongo.db.cars.find_one({'_id': ObjectId(car_id)})
        if car is None:
            return jsonify({'error': 'Car not found'})
        car['_id'] = str(car['_id'])
        return jsonify(car)
    except:
        return jsonify({'error': 'Invalid car ID'})

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
    user = mongo.db.users.find_one({'_id': ObjectId(request.json['userid'])})
    user_email = user['email']
    subject = "Test Drive Slot Reserved"
    message = f"Dear {user['first_name']} {user['last_name']},\n\nYour test drive slot has been successfully reserved for {request.json['time']}.\n\nLooking forward to seeing you!\n\nBest regards,\nThe Website Team"
    send_email(user_email, subject, message)
    return 'Timeslot reserved successfully!'


@app.route('/delete_timeslot/<user_id>', methods=['DELETE'])
def delete_timeslot(user_id):
    # function that deletes timeslot from database using id
    try:
        mongo.db.timeslots.delete_one({'userid': user_id})
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        user_email = user['email']
        subject = "Test Drive Slot Canceled"
        message = f"Dear {user['first_name']} {user['last_name']},\n\nYour test drive slot has been successfully canceled.\n\nWe hope to see you again soon!\n\nBest regards,\nThe Website Team"
        send_email(user_email, subject, message)
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


@app.route('/slot_by_id/<user_id>', methods=['GET'])
def slot_by_id(user_id):
    timeslot = mongo.db.timeslots.find_one({'userid': user_id})
    if not timeslot:
        return "no test drive"
    return json.loads(json_util.dumps(timeslot))

if __name__ == "_main_":
    app.run()

