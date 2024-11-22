import path from 'path'; 
import fs from 'fs';

async function handleImagesRequest(req, res){
    const imageName = req.params.imageName;

    // Build the correct path to the image file
    const imagePath = path.join('../Frontend/','images', imageName); 

    // Check if the image file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(imagePath);
            res.status(404).send('Image not found');
        } else {
            res.sendFile(imageName, { root: '../Frontend/images' }); 
        }
    });
}

async function handleCSSRequest(req, res){
    const cssFileName = req.params.cssFileName; 
    res.sendFile(`${cssFileName}.css`, { root: '../Frontend/CSS files/' });
} 
async function handleHTMLRequest(req, res){
    const htmlFileName = req.params.htmlFileName; 
    res.sendFile(`${htmlFileName}.html`, { root: '../Frontend/' }); // Adjust file path if needed
}
async function handleJSRequest(req, res){
    const jsFileName = req.params.jsFileName; 
    res.sendFile(`${jsFileName}.js`, { root: '../Frontend/Scripts/' });
}

export {
    handleImagesRequest,
    handleCSSRequest,
    handleHTMLRequest,
    handleJSRequest,
}