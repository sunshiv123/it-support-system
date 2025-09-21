document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticketForm');
    const ticketsList = document.getElementById('ticketsList');

    // Base URL of our backend API
    const API_URL = 'http://localhost:8081/api/tickets';

    // Get the current logged-in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If no user is logged in, redirect to the login page
    if (!currentUser) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Function to fetch and display tickets
    const fetchTickets = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const tickets = await response.json();
            
            ticketsList.innerHTML = ''; // Clear the list
            if (tickets.length === 0) {
                ticketsList.innerHTML = '<p>No tickets found.</p>';
                return;
            }

            tickets.forEach(ticket => {
                const ticketItem = document.createElement('div');
                ticketItem.classList.add('ticket-item');
                ticketItem.innerHTML = `
                    <h3>Subject: ${ticket.subject}</h3>
                    <p><strong>Status:</strong> ${ticket.status}</p>
                    <p><strong>Priority:</strong> ${ticket.priority}</p>
                    <p><strong>Created by:</strong> ${ticket.user.firstName} ${ticket.user.lastName}</p>
                    <p><strong>Description:</strong> ${ticket.description}</p>
                    <hr>
                `;
                ticketsList.appendChild(ticketItem);
            });
        } catch (error) {
            console.error('Error fetching tickets:', error);
            ticketsList.innerHTML = '<p>Error loading tickets. Please check the backend server.</p>';
        }
    };

    // Function to handle form submission
    ticketForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const subject = document.getElementById('subject').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;

        const newTicket = { 
            subject, 
            description, 
            priority,
            user: { id: currentUser.id } // Now uses the ID of the logged-in user
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTicket),
            });
            
            if (response.ok) {
                alert('Ticket submitted successfully!');
                ticketForm.reset();
                fetchTickets();
            } else {
                alert('Failed to submit ticket.');
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            alert('An error occurred. Please try again.');
        }
    });

    fetchTickets();
});