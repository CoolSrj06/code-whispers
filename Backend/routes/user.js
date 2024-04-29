const express =require('express');
const router=express.Router();
const app = express();

const { handleUserSignUp,handleUserLogin }=require('../controller/user');

app.use(express.static('../'));

// Mount the router with the '/user' prefix
app.use('/user', router);

router.post('/signUp',handleUserSignUp);
router.post('/login',handleUserLogin);

module.exports=router;