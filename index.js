window.onload = function() {
    const username = sessionStorage.getItem('username');
    console.log(username);
    console.log('hello');

    if (username) {
      // Find the element where you want to display the name
      const welcomeElement = document.getElementById('welcome-message'); 
      if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${username}!`;
      }
  
      // Potentially hide login/signup buttons (modify selectors as needed)
      const loginButton = document.querySelector('.login-signup-btn'); // Example
      if (loginButton) {
        loginButton.style.display = 'none'; 
      } 
    } 
  };
  