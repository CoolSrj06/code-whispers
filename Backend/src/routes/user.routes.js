import { Router } from "express";
import express from "express";
import { handleUserSignUp,handleUserLogin, logoutUser, getCurrentUser, changeCurrentPassword, postDoubt,fetchData, submitAnswer } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.js"
//import {upload} from "../middlewares/multer.middleware.js"
//import {verifyJWT} from "../middlewares/auth.middleware.js"

const app = express();
const router = Router();

//const { handleUserSignUp,handleUserLogin }=require('../controller/user');

app.use(express.static('../'));

app.use('/api/v2/users/', router)
router.post('/signUp',handleUserSignUp);
router.post('/login',handleUserLogin);
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/my-account").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/doubt/post").post(verifyJWT,postDoubt);
router.route('/doubt/fetchData').get(fetchData);
router.route('/doubt/submitAnswer').post(verifyJWT,submitAnswer);

export default router