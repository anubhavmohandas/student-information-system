from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for all routes

# MongoDB Atlas connection string
MONGO_URI = os.environ.get('MONGO_URI')
if not MONGO_URI:
    raise ValueError("No MONGO_URI found in environment variables!")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client.student_information_system  # Database name
students_collection = db.students  # Collection name

# Helper function to convert MongoDB ObjectId to string
def serialize_document(doc):
    if doc and '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

# Route to serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# API Routes
@app.route('/api/students', methods=['GET'])
def get_all_students():
    students = list(students_collection.find())
    # Convert ObjectId to string for JSON serialization
    serialized_students = [serialize_document(student) for student in students]
    return jsonify(serialized_students)

@app.route('/api/students/<id>', methods=['GET'])
def get_student(id):
    try:
        student = students_collection.find_one({'_id': ObjectId(id)})
        if student:
            return jsonify(serialize_document(student))
        return jsonify({'error': 'Student not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/students', methods=['POST'])
def create_student():
    try:
        student_data = request.json
        result = students_collection.insert_one(student_data)
        return jsonify({
            'message': 'Student created successfully',
            '_id': str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/students/<id>', methods=['PUT'])
def update_student(id):
    try:
        student_data = request.json
        result = students_collection.update_one(
            {'_id': ObjectId(id)},
            {'$set': student_data}
        )
        if result.modified_count:
            return jsonify({'message': 'Student updated successfully'})
        return jsonify({'message': 'No changes made'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/students/<id>', methods=['DELETE'])
def delete_student(id):
    try:
        result = students_collection.delete_one({'_id': ObjectId(id)})
        if result.deleted_count:
            return jsonify({'message': 'Student deleted successfully'})
        return jsonify({'error': 'Student not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)