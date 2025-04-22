# 🎓 Student Information System

A full-stack web application for managing student records using Flask and MongoDB, deployed on Render. Perfect for schools, tutors, or anyone managing student data!

## ✨ Features

- ✏️ Create, read, update, and delete student records
- 🖱️ User-friendly interface with intuitive controls
- ⚡ Real-time data updates
- 🔔 Confirmation dialogs for dangerous operations
- 📱 Responsive design for desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **Database**: MongoDB Atlas
- **Deployment**: Render (cloud platform)

## 📁 Project Structure

```
student-information-system/
├── static/
│   ├── styles.css
│   └── script.js
├── index.html
├── app.py
├── .env (you'll need to create this - not in GitHub)
├── requirements.txt
├── gunicorn_config.py
└── README.md
```

## 🚀 Local Development Setup

### Prerequisites

- 🐍 Python 3.7+
- 🍃 MongoDB Atlas account
- 🌐 Web browser
- 📊 Git

### Setting Up MongoDB Atlas

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient)
3. Under "Security" → "Database Access", create a new database user with read and write permissions
4. Under "Security" → "Network Access", add your IP address or use 0.0.0.0/0 for development
5. Under "Databases", click "Connect" to your cluster, select "Connect your application", and copy the connection string

### Setting Up Locally After Cloning

1. Clone the repository:
   ```
   git clone https://github.com/anubhavmohandas/student-information-system.git
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

4. ⚠️ **Important**: Create a `.env` file in the project root (this file isn't included in the repo for security reasons):
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/student_information_system?retryWrites=true&w=majority
   ```
   Replace `<username>`, `<password>`, and `<cluster-url>` with your MongoDB Atlas credentials.

5. Run the application:
   ```
   python app.py
   ```

6. Open your browser and navigate to `http://localhost:5000` 🎉

## 🌐 Deployment on Render

### Prerequisites

- Render account (create one at [render.com](https://render.com) if needed)
- MongoDB Atlas cluster already set up and accessible from anywhere (Network Access: 0.0.0.0/0)
- A GitHub repository with your project code

### Deployment Steps

1. Fork or clone this repository to your own GitHub account and push your changes.

2. Log in to your Render account and create a new Web Service:
   - Click "New" and select "Web Service"
   - Connect your GitHub repository
   - Give your service a name (e.g., "student-information-system")

3. Configure the deployment settings:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free (for testing)

4. Add your environment variables:
   - Click on "Environment" tab
   - Add your MongoDB Atlas connection string:
     - Key: `MONGO_URI`
     - Value: `mongodb+srv://<username>:<password>@<cluster-url>/student_information_system?retryWrites=true&w=majority`

5. Click "Create Web Service" and wait for deployment to complete.

6. Once deployed, you can access your application at the URL provided by Render. 🚀

## 🔄 API Endpoints

- `GET /api/students`: Get all students
- `GET /api/students/<id>`: Get a specific student
- `POST /api/students`: Create a new student
- `PUT /api/students/<id>`: Update a student
- `DELETE /api/students/<id>`: Delete a student

## ❓ Troubleshooting Deployment

If your deployment encounters issues:

1. **Database Connection Issues**:
   - Ensure your MongoDB Atlas cluster allows connections from anywhere (Network Access: 0.0.0.0/0)
   - Verify the connection string format and credentials

2. **Application Errors**:
   - Check Render logs in the dashboard for specific error messages
   - Ensure all required environment variables are set
   - Confirm gunicorn is listed in requirements.txt

3. **502 Bad Gateway Errors**:
   - Check application startup logs
   - Make sure your app starts without errors locally
   - Verify the start command is correct

## 🔒 Files Not Included in the Repository (You Need to Create These)

When cloning this repository, you'll need to create these files which are excluded for security reasons:

1. **`.env` file**: Contains your MongoDB connection string
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/student_information_system?retryWrites=true&w=majority
   ```

2. **`venv/` directory**: Your virtual environment (created using `python -m venv venv`)

3. **`__pycache__/` directory**: Python cache files (automatically generated)

## 📝 .gitignore Contents

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

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Anubhav Mohandas](https://github.com/anubhavmohandas)
