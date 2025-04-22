document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const studentForm = document.getElementById('student-form');
    const formTitle = document.getElementById('form-title');
    const studentIdInput = document.getElementById('student-id');
    const addNewBtn = document.getElementById('add-new-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const studentsList = document.getElementById('students-list');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    
    // Keep track of the student ID to delete
    let studentToDelete = null;
    
    // API URL - update this to your Flask server URL when deployed
    // const API_URL = 'http://localhost:5000/api';
    const API_URL = 'https://anubhavmohandas.pythonanywhere.com/api';
    
    // Fetch all students when page loads
    fetchAllStudents();
    
    // Event Listeners
    studentForm.addEventListener('submit', handleFormSubmit);
    addNewBtn.addEventListener('click', showAddForm);
    cancelBtn.addEventListener('click', resetForm);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    cancelDeleteBtn.addEventListener('click', closeModal);
    
    // Functions
    function fetchAllStudents() {
        fetch(`${API_URL}/students`)
            .then(response => response.json())
            .then(data => {
                renderStudentsList(data);
            })
            .catch(error => console.error('Error fetching students:', error));
    }
    
    function renderStudentsList(students) {
        studentsList.innerHTML = '';
        
        if (students.length === 0) {
            studentsList.innerHTML = '<tr><td colspan="5" class="text-center">No students found</td></tr>';
            return;
        }
        
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course || '-'}</td>
                <td>${student.year ? student.year + ' Year' : '-'}</td>
                <td class="action-buttons">
                    <button class="btn btn-edit" data-id="${student._id}">Edit</button>
                    <button class="btn btn-danger" data-id="${student._id}">Delete</button>
                </td>
            `;
            
            // Add event listeners to the buttons
            const editBtn = row.querySelector('.btn-edit');
            const deleteBtn = row.querySelector('.btn-danger');
            
            editBtn.addEventListener('click', () => editStudent(student._id));
            deleteBtn.addEventListener('click', () => showDeleteConfirmation(student._id));
            
            studentsList.appendChild(row);
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            address: document.getElementById('address').value,
            course: document.getElementById('course').value,
            year: document.getElementById('year').value
        };
        
        const studentId = studentIdInput.value;
        
        if (studentId) {
            // Update existing student
            updateStudent(studentId, formData);
        } else {
            // Create new student
            createStudent(formData);
        }
    }
    
    function createStudent(data) {
        fetch(`${API_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            resetForm();
            fetchAllStudents();
            alert('Student added successfully!');
        })
        .catch(error => console.error('Error creating student:', error));
    }
    
    function updateStudent(id, data) {
        fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            resetForm();
            fetchAllStudents();
            alert('Student updated successfully!');
        })
        .catch(error => console.error('Error updating student:', error));
    }
    
    function deleteStudent(id) {
        fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            fetchAllStudents();
            alert('Student deleted successfully!');
        })
        .catch(error => console.error('Error deleting student:', error));
    }
    
    function editStudent(id) {
        // Fetch the student data
        fetch(`${API_URL}/students/${id}`)
            .then(response => response.json())
            .then(student => {
                // Populate the form
                formTitle.textContent = 'Edit Student';
                studentIdInput.value = student._id;
                document.getElementById('name').value = student.name;
                document.getElementById('email').value = student.email;
                document.getElementById('phone').value = student.phone || '';
                document.getElementById('dob').value = student.dob || '';
                document.getElementById('address').value = student.address || '';
                document.getElementById('course').value = student.course || '';
                document.getElementById('year').value = student.year || '';
                
                // Scroll to the form
                document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => console.error('Error fetching student:', error));
    }
    
    function showDeleteConfirmation(id) {
        studentToDelete = id;
        confirmationModal.style.display = 'flex';
    }
    
    function confirmDelete() {
        if (studentToDelete) {
            deleteStudent(studentToDelete);
            closeModal();
        }
    }
    
    function closeModal() {
        confirmationModal.style.display = 'none';
        studentToDelete = null;
    }
    
    function showAddForm() {
        resetForm();
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    }
    
    function resetForm() {
        formTitle.textContent = 'Add New Student';
        studentForm.reset();
        studentIdInput.value = '';
    }
});