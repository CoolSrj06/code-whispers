const User = require("../model/user");

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    try { // Add error handling
        await User.create({
            name,
            email,
            password, 
        });

        res.redirect('/index.html'); 
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle the error appropriately (e.g., redirect, send error message)
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try { // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            // User not found
            return res.status(401).json({ error: 'Invalid email or password' });
          }
        //Compare password (no hashing required)
        const isPasswordMatch = (password === user.password);

        if (!isPasswordMatch) {
            // Incorrect password
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 4. Successful login - handle session or token generation
        // ... your code for creating a session or generating a JWT

        res.redirect('/index.html'); 
    }
    catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
    } 
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
};
