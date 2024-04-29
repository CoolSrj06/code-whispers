const displayArea = document.getElementById('displayArea');

// Function to fetch and display data on page load
function fetchDataAndDisplay() {
  fetch('/doubt/fetchData')
    .then(response => response.json())
    .then(data => {
      // Clear any existing content in the display area
      displayArea.innerHTML = ''; 

      data.forEach(entry => {
        const newEntry = document.createElement('div');
        newEntry.classList.add('entry'); 

        const doubtHeading = document.createElement('h3');
        doubtHeading.textContent = 'Doubt:';
        newEntry.appendChild(doubtHeading);

        const doubtText = document.createElement('p'); 
        doubtText.textContent = entry.doubt;
        newEntry.appendChild(doubtText);

        if (entry.code) { // Check if entry.code exists and is not empty
          const codeHeading = document.createElement('h3');
          codeHeading.textContent = 'Code:';
          newEntry.appendChild(codeHeading);

          const codePre = document.createElement('pre');
          codePre.textContent = entry.code;
          newEntry.appendChild(codePre);
        }

        // Answer Section 
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer-section');

        if (entry.answer) {
          const answerHeading = document.createElement('h3');
          answerHeading.textContent = 'Answer:';
          answerDiv.appendChild(answerHeading);

          const answerText = document.createElement('p');
          answerText.textContent = entry.answer;
          answerDiv.appendChild(answerText);
        } else {
          // Create answer form
          const answerForm = document.createElement('form');  
          const answerInput = document.createElement('textarea');
          answerInput.placeholder = 'Enter your answer...';
          answerForm.appendChild(answerInput);

          const submitButton = document.createElement('button');
          submitButton.textContent = 'Submit Answer';
          submitButton.type = 'submit'; // Prevent default form submit
          answerForm.appendChild(submitButton);

          answerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            const answerText = answerInput.value;
            submitAnswer(entry._id, answerText); 
          });

          answerDiv.appendChild(answerForm);
        }

        newEntry.appendChild(answerDiv); 
        displayArea.appendChild(newEntry); 
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error); 
      // Display an error message to the user (optional)
    });
}

async function submitAnswer(doubtId, answerText) {
  try {
    const response = await fetch('/doubt/submitAnswer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doubtId, answerText }) 
    });

    if (response.ok) {
      // Handle successful submission (e.g., update the display)
      fetchDataAndDisplay(); // Refresh doubts
      console.log('Answer submitted successfully!');
    } else {
      // Handle error
      console.error('Error submitting answer:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
  }
}


// Call the function to display data initially
fetchDataAndDisplay();
