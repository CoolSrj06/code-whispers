const form = document.querySelector('.login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Create an object from form data

    try {
        // Send login data to backend
        const response = await fetch('/api/v2/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log(response);
        
        if (!response.ok) {
            // If response is not ok, handle errors from the server
            const errorData = await response.json();
            errorMessage.textContent = 'Username or password incorrect'; // Display message
            errorMessage.style.display = 'block'; // Show error message
        }else{
            // If login is successful, redirect to the homepage or dashboard
            const result = await response.json();
            console.log(result.message); // Optionally log success message
            window.location.href = '/api/v2/url/'; // Redirect to homepage or dashboard URL
        }
    } catch (error) {
        // If there's an error in the fetch process (network issues, etc.)
        console.error('Error:', error);
        errorMessage.textContent = 'Something went wrong, please try again later'; // Display a generic error message
        errorMessage.style.display = 'block'; // Show error message
    }
});
