const express=require('express');
const {handleHomePage}=require('./staticRouter');
const router=express.Router();
const app = express();
const{handleImagesRequest, handleCSSRequest, handleHTMLRequest} = require('../controller/url');


app.use(express.static('../')); // Serve files from the directory
app.use(express.static('../images/')); // Specifically for the 'images' folder

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../' }); 
});

router.get('/:htmlFileName.html', handleHTMLRequest);
router.get('/:cssFileName.css', handleCSSRequest);
router.get('/images/:imageName',handleImagesRequest);

module.exports=router;