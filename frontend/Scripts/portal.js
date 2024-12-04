const form = document.getElementById('query');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Create an object from form data
    
    try {
        // Send change password data to backend
        const response = await fetch('/api/v2/users/doubt/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            if(response.status===401){
                alert('You need to be logged in to submit an answer.');
                return;
            }
            // If response is not ok, handle errors from the server
            const errorData = await response.json();
            const errorMessageText = errorData.message || 'An error occurred, please try again later';

            //Display the error message from the backend
            errorMessage.textContent = errorMessageText;
            errorMessage.style.display = 'block'; // Show error message
        } else {
            // If password change is successful, redirect to the homepage or dashboard with a query parameter
            const result = await response.json();
            console.log(result.message); // Optionally log success message
            window.location.href = '/api/v2/url/?queryPosted=true'; // Redirect to homepage or dashboard URL with query parameter
        }
    } catch (error) {
        // If there's an error in the fetch process (network issues, etc.)
        console.error('Error:', error);
        errorMessage.textContent = 'Something went wrong, please try again later'; // Display a generic error message
        errorMessage.style.display = 'block'; // Show error message
    }
});
