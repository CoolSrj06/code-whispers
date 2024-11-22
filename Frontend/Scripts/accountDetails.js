// Select the HTML element where user details will be displayed
const userDetailsContainer = document.getElementById('user-details');
const accountDetails = document.getElementById('accountDetails');

// Function to fetch user details from the backend
// JavaScript code to fetch and display user details
async function fetchUserDetails() {
    try {
        // Make an API call to the backend
        const response = await fetch('/api/v2/users/my-account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${document.cookie.split('accessToken=')[1]}` // Uncomment if token is required
            },
            credentials: 'include' // Include cookies in the request if necessary
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Update HTML with user details
        document.getElementById('username').textContent = data.user.username || 'N/A';
        document.getElementById('fullname').textContent = data.user.fullName || 'N/A';
        document.getElementById('email').textContent = data.user.email || 'N/A';
    } catch (error) {
        console.error('Failed to fetch user details:', error);
        document.getElementById('user-details').innerHTML = `
            <p style="color:red;">Failed to load user details. Please try again later.</p>
        `;
    }
}

// Call the function to fetch and display user details
fetchUserDetails();


// Call the function to fetch user details when the page loads
document.addEventListener('DOMContentLoaded', fetchUserDetails);

document.querySelector('.logout-btn').addEventListener('click', async () => {
    try {
        // Send a POST request to log out
        const response = await fetch('/api/v2/users/logout', {
        method: 'POST',
        credentials: 'include', // This ensures cookies are sent along with the request
        });
    
        const data = await response.json();
    
        if (response.ok) {
        // Handle successful logout (e.g., redirect to login page or update UI)
        console.log(data.message); // Should print: "User logged out successfully"
        window.location.href = '/api/v2/url/'; // Redirect to login page
        } else {
        console.error('Logout failed:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    });

document.addEventListener('DOMContentLoaded', () => {
    // Select the elements
    const changePasswordBtn = document.querySelector('.changePassword-btn');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const logoutBtn = document.querySelector('.logout-btn');

    // Add event listener to the button
    changePasswordBtn.addEventListener('click', () => {
        // Hide the button and show the form
        changePasswordBtn.style.display = 'none';
        changePasswordForm.style.display = 'block';
        logoutBtn.style.display = 'none';
    });
});
    