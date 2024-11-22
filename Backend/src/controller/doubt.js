const User = require("../model/doubts");

async function handleUserDoubts(req, res) {
    const { doubt,code} = req.body;

    try { // Add error handling

        const answer = '';

        await User.create({
            doubt,
            code,
            answer,
        });

        res.redirect('/queries.html'); 
    } catch (error) {
        console.error("Error while posting doubt:", error);
        // Handle the error appropriately (e.g., redirect, send error message)
    }
}

// Function to fetch doubts
async function fetchData(req, res) {
    try {
      const doubts = await User.find(); 
      res.json(doubts);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send('Error fetching data'); // Send a server error status
    }
  }

// Function to update answer
async function submitAnswer(req, res) {
    const { doubtId, answerText } = req.body;
  
    try {
      const updatedDoubt = await User.findByIdAndUpdate(doubtId, {
        answer: answerText
      }, { new: true }); // Returns the updated doubt
  
      res.json(updatedDoubt); 
    } catch (error) {
      console.error('Error updating answer:', error);
      res.status(500).send('Error updating answer');
    }
  }  

module.exports = {
   handleUserDoubts,
   fetchData,
   submitAnswer,
};