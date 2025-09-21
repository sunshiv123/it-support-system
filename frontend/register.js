document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const API_URL = 'http://localhost:8081/api/users/register';
    
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!firstName || !lastName || !email || !password) {
            alert('Please fill out all fields.');
            return;
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            role: 'user'
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            
            if (response.ok) {
                const data = await response.json();
                alert(`User registered successfully! Welcome, ${data.firstName}!`);
                // This line clears the form after a successful registration
                registrationForm.reset(); 
                // This will redirect the user to the main page after a successful registration.
                window.location.href = 'index.html'; 
            } else {
                alert('Failed to register user. The email might already be in use.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    });
});