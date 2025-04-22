# Student Information System

A full-stack web application for managing student records.

## Features

- Create, read, update, and delete student records
- User-friendly interface
- Real-time data updates
- Confirmation dialogs for deletion
- Responsive design

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **Database**: MongoDB Atlas
- **Deployment**: Instructions for local deployment provided

## Project Structure

```
student-information-system/
├── static/
│   ├── styles.css
│   └── script.js
├── templates/
│   └── index.html
├── app.py
├── .env
├── requirements.txt
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.7+
- MongoDB Atlas account
- Web browser
- Git

### Setting Up MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient)
3. Under "Security" → "Database Access", create a new database user with read and write permissions
4. Under "Security" → "Network Access", add a new IP address (you can use 0.0.0.0/0 for development, but use more restricted settings for production)
5. Under "Databases", click "Connect" to your cluster, select "Connect your application", and copy the connection string

### Local Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/student-information-system.git
   cd student-information-system
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project root and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/student_information_system?retryWrites=true&w=majority
   ```
   Replace `<username>`, `<password>`, and `<cluster-url>` with your MongoDB Atlas credentials.

5. Run the application:
   ```
   python app.py
   ```

6. Open your browser and navigate to `http://localhost:5000`

## API Endpoints

- `GET /api/students`: Get all students
- `GET /api/students/<id>`: Get a specific student
- `POST /api/students`: Create a new student
- `PUT /api/students/<id>`: Update a student
- `DELETE /api/students/<id>`: Delete a student

## Folder Structure for GitHub Repository

For proper GitHub organization, create the following folder structure:

```
/
├── static/
│   ├── styles.css
│   └── script.js
├── templates/
│   └── index.html
├── app.py
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## .gitignore Contents

Create a `.gitignore` file with these contents:

```
# Environment variables
.env

# Python
__pycache__/
*.py[cod]
*$py.class
venv/
env/

# IDE
.vscode/
.idea/

# Others
*.log
```

## License

This project is open source and available under the [MIT License](LICENSE).