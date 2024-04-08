const express=require('express');
const {handleHomePage}=require('./staticRouter');
const router=express.Router();
const app = express();


app.use(express.static('../')); // Serve files from the 'public' directory

router.get('/styles.css', (req, res) => {
    res.sendFile('styles.css', { root: '../' }); // Adjust the path if needed
});
router.get('/about.css', (req, res) => {
    res.sendFile('about.css', { root: '../' }); // Adjust the path if needed
});
router.get('/developers.css', (req, res) => {
    res.sendFile('developers.css', { root: '../' }); // Adjust the path if needed
});
router.get('/login.css', (req, res) => {
    res.sendFile('login.css', { root: '../' }); // Adjust the path if needed
});
router.get('/pakages.css', (req, res) => {
    res.sendFile('pakages.css', { root: '../' }); // Adjust the path if needed
});
router.get('/portal.css', (req, res) => {
    res.sendFile('portal.css', { root: '../' }); // Adjust the path if needed
});
router.get('/resources.css', (req, res) => {
    res.sendFile('resources.css', { root: '../' }); // Adjust the path if needed
});

// Image 
router.get('/Ankit.png', (req, res) => {
    res.sendFile('Ankit.png', { root: '../' }); // Adjust the path if needed
});



router.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../' }); // Assuming 'index.html' is in the directory
});
router.get('/resources.html', (req, res) => {
    res.sendFile('resources.html', { root: '../' }); // Adjust the path if needed
});
router.get('/about.html', (req, res) => {
    res.sendFile('about.html', { root: '../' }); // Adjust the path if needed
});
router.get('/packages.html', (req, res) => {
    res.sendFile('packages.html', { root: '../' }); // Adjust the path if needed
});
router.get('/developers.html', (req, res) => {
    res.sendFile('developers.html', { root: '../' }); // Adjust the path if needed
});
module.exports=router;