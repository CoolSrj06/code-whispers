const express=require('express');
const {handleHomePage}=require('./staticRouter');
const router=express.Router();
const app = express();
const path = require('path'); 
const fs=require('fs')


app.use(express.static('../')); // Serve files from the directory
app.use(express.static('../images/')); // Specifically for the 'images' folder

router.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;

    // Build the correct path to the image file
    const imagePath = path.join('..','images', imageName); 

    // Check if the image file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(imagePath);
            res.status(404).send('Image not found');
        } else {
            res.sendFile(imageName, { root: '../images' }); 
        }
    });
});



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
router.get('/packages.css', (req, res) => {
    res.sendFile('packages.css', { root: '../' }); // Adjust the path if needed
});
router.get('/portal.css', (req, res) => {
    res.sendFile('portal.css', { root: '../' }); // Adjust the path if needed
});
router.get('/resources.css', (req, res) => {
    res.sendFile('resources.css', { root: '../' }); // Adjust the path if needed
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