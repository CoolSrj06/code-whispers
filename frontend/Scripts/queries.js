const sortByLanguage = document.getElementById('sortByLanguage');
const displayArea = document.getElementById('displayArea');
let fetchedData = []; // To store the fetched data for filtering

// Call the function to display data initially
fetchDataAndDisplay();

function fetchDataAndDisplay() {
    fetch('/api/v2/users/doubt/fetchData')
        .then(response => response.json())
        .then(data => {
            fetchedData = data; // Store the fetched data globally
            displayQueries(fetchedData); // Display all queries initially
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to display queries
function displayQueries(data) {
    displayArea.innerHTML = ''; // Clear any existing content in the display area

    data.forEach(entry => {
        const newEntry = document.createElement('div');
        newEntry.classList.add('entry');

        const doubtHeading = document.createElement('h3');
        doubtHeading.textContent = 'Doubt:';
        newEntry.appendChild(doubtHeading);

        const doubtText = document.createElement('p');
        doubtText.textContent = entry.doubt;
        newEntry.appendChild(doubtText);

        const language = document.createElement('h4');
        language.textContent = 'Language:';
        newEntry.appendChild(language);

        const languageValue = document.createElement('pre');
        languageValue.textContent = entry.language;
        newEntry.appendChild(languageValue);

        if (entry.code) {
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
            const answerForm = document.createElement('form');
            const answerInput = document.createElement('textarea');
            answerInput.placeholder = 'Enter your answer...';
            answerForm.appendChild(answerInput);

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit Answer';
            submitButton.type = 'submit';
            answerForm.appendChild(submitButton);

            answerForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const answerText = answerInput.value;
                submitAnswer(entry._id, answerText);
            });

            answerDiv.appendChild(answerForm);
        }

        newEntry.appendChild(answerDiv);
        displayArea.appendChild(newEntry);
    });
}

// Event listener for sorting
sortByLanguage.addEventListener('change', () => {
    const selectedLanguage = sortByLanguage.value;

    if (selectedLanguage === 'all') {
        displayQueries(fetchedData); // Display all queries
    } else {
        const filteredData = fetchedData.filter(entry => entry.language === selectedLanguage);
        displayQueries(filteredData); // Display filtered queries
    }
});

// Function to submit an answer
async function submitAnswer(doubtId, answerText) {
  try {
    const response = await fetch('/api/v2/users/doubt/submitAnswer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doubtId, answerText }) 
    })
    if (response.ok) {
      // Handle successful submission (e.g., update the display)
      fetchDataAndDisplay(); // Refresh doubts
      console.log('Answer submitted successfully!');
    } else if(response.status===401){
      alert('You need to be logged in to submit an answer.');
      return;
    }else {
      // Handle error
      console.error('Error submitting answer:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
  }
}
