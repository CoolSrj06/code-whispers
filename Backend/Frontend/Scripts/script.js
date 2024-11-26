// Function to check if the access token cookie exists
function isUserLoggedIn() {
    
    return document.cookie.split('; ').some(cookie => cookie.startsWith('isLoggedIn=true'));
}

// Function to hide the signup button
function updateUI() {
    const myAccount = document.querySelector('.account-details-btn');
    const signupButton = document.querySelector('.login-signup-btn')
    if (isUserLoggedIn()) {
        signupButton.style.display = 'none';
    }else {
        myAccount.style.display = 'none';
    }
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', updateUI());

// Check for the query parameter 'passwordUpdated'
const urlParams = new URLSearchParams(window.location.search);
const passwordUpdated = urlParams.get('passwordUpdated');

// If the parameter exists, show an alert message
if (passwordUpdated) {
    alert('Password updated successfully!');
}







