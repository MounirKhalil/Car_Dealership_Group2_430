from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bcrypt
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)


app.config['MONGO_DBNAME'] = 'mydatabase'

"""
Here we need to place the url of the database in an .env variable for better security latter following these steps:
Sign up for a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas.
Create a new project and a new cluster in your MongoDB Atlas account.
Under "Security", click "Database Access" and add a new database user with the necessary privileges.
Under "Network Access", click "Add IP Address" and add your current IP address or allow access from anywhere (0.0.0.0/0).
Under "Clusters", click "Connect" and select "Connect your application".
Select "Python" as the driver and copy the connection string.
Update your Flask application's MongoDB connection string to the connection string from MongoDB Atlas.
MONGO_URI = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority'
Replace <username> with the username you created, <password> with the password you created, <cluster> with the name of your cluster, and <database> with the name of the database you want to use.

"""

app.config['MONGO_URI'] = 'mongodb://localhost:27017/mydatabase'

mongo = PyMongo(app)


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
                }, app.config['SECRET_KEY'])
                return jsonify({'token': token.decode('utf-8'), 'admin': True})
            else:
                return jsonify({'error': 'You do not have permission to access the admin panel'})
    return jsonify({'error': 'Invalid username or password'})


@app.route('/signup', methods=['POST'])
def sign_up():
    """
    This function handles user registration. It checks if the user already exists and adds a new user
    to the database if they don't exist.
    """
    email = request.json['email']
    password = request.json['password']

    users_collection = mongo.db.users

    existing_user = users_collection.find_one({'email': email})

    if existing_user:
        return jsonify({'error': 'User already exists'})

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({'email': email, 'password': hashed_password})

    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(debug=True)
