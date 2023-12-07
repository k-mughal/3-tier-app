import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

load_dotenv()
CORS(app)  # Enable CORS for all routes

# QLAlchemy database URI
SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"


app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

db = SQLAlchemy(app)

class Users(db.Model):
    __tablename__ = 'Users_Table'  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), nullable=True)
    email = db.Column(db.String(200), nullable=True)
    password = db.Column(db.String(20), nullable=True)

with app.app_context():
    db.create_all()

@app.route('/customers-list', methods=['GET'])
def get_customers():
    customers = Users.query.all()
    cust_list = [
        {'username': cust.username, 'email': cust.email, 'password': cust.password} for cust in customers
    ]
    return jsonify({'Customers': cust_list})

@app.route('/create-customer', methods=['POST'])
def create_customer():
    data = request.get_json()
    new_customer = Users(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_customer)
    db.session.commit()
    return jsonify({'message': 'User Created'}), 201


if __name__ == '__main__':
    app.run(debug=True)
