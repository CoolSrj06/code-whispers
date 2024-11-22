const express =require('express');
const router=express.Router();
const app = express();

const {handleUserDoubts,fetchData,submitAnswer} = require('../controller/doubt');

app.use(express.static('../'));

// Mount the router with the '/user' prefix
app.use('/doubt', router);

router.post('/post',handleUserDoubts);
router.get('/fetchData', fetchData);
router.post('/submitAnswer',submitAnswer);

module.exports=router; 