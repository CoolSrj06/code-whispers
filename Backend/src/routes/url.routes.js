import { Router } from "express";
import {handleImagesRequest, handleCSSRequest, handleHTMLRequest, handleJSRequest} from '../controller/url.controller.js'
const router = Router()
//app.use(express.static('../')); // Serve files from the directory
//app.use(express.static('../images/')); // Specifically for the 'images' folder

router.get('/index.html', (req, res) => {
    res.redirect('/api/v2/url/');
});

router.get('/', ( _ , res) => {
    res.sendFile('index.html', { root: '../Frontend/' }); 
});

router.get('/:htmlFileName.html', handleHTMLRequest);
router.get('/:cssFileName.css', handleCSSRequest);
router.get('/Scripts/:jsFileName.js', handleJSRequest);
router.get('/images/:imageName',handleImagesRequest);

export default router