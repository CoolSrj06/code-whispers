window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userLoggedIn = urlParams.get('userLoggedIn') === 'true'; 
  
    // Hide buttons if logged in (from sessionStorage or query parameter)
    if (userLoggedIn) { 
        const loginSignupButtons = document.querySelectorAll('.login-signup-btn'); 
        loginSignupButtons.forEach(button => {
          button.style.display = 'none'; 
        });
        // Set 'isLoggedIn' in sessionStorage (ONLY after successful signup)
        sessionStorage.setItem('isLoggedIn', 'true');  
    } 
  };