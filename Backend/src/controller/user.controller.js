import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from '../model/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { Query } from "../model/doubts.model.js"

const generateAccessAndRefreshTokens = async(userId) => 
    {
        try {
            const user = await User.findById(userId)
            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()
    
            user.refreshToken = refreshToken
            await user.save({validateBeforeSave: true})
    
            return {accessToken, refreshToken}
    
        } catch (err) {
            throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
        }
    }

const handleUserSignUp = asyncHandler( async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        fullName,
        email, 
        password,
        username: username.toLowerCase()
    }) 

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
        .status(201)
        .redirect('/api/v2/url/login.html')
})

const handleUserLogin = asyncHandler(async (req, res) => {

    const { emailOrUsername, password } = req.body;

    if(!emailOrUsername){ 
        throw new ApiError(400, "Username or Email is required")
    }

    // Find the user by either email or username
    const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }).select('+password'); // Include the password for comparison;

    if (!user) {
        // User not found
        throw new ApiError(404, "User does not exist")
    }

    // Compare password (make sure to hash passwords in your user model)
    const isPasswordValid = await user.isPasswordCorrect(password)

    
    if(!isPasswordValid){
        throw new ApiError(401, "Incorrect password")
    }

    const { accessToken,refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select( " -password -refreshToken" )

    const options = {
        httpOnly: true,
        secure: true,
    }

    const isLoggedInOptions = {
        httpOnly: false,  // Allow frontend JS to read this cookie
        secure: false,    // set to true if using HTTPS in production
        path: '/',        // Make it available across your app
    };
    
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .cookie("isLoggedIn", 'true', isLoggedInOptions)
    .json({ success: true, message: "Login successful" });
})

const logoutUser = asyncHandler(async(req, res) => {
    
    User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    const isLoggedInOptions = {
        httpOnly: false,  // Allow frontend JS to read this cookie
        secure: false,    // set to true if using HTTPS in production
        path: '/',        // Make it available across your app
    };

    return res
    .status(200)
    .cookie("refreshToken", options)
    .cookie("accessToken", options)
    .cookie("isLoggedIn", 'false', isLoggedInOptions)
    .json( new ApiResponse(200, {} , "User logged out successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    // Check if req.user exists (set by verifyJWT middleware)
    if (!req.user) {
        throw new ApiError(401, "Unauthorized. No user information available.");
    }
    
    return res
    .status(200)
    .json({
        statusCode: 200,
        user: req.user,
        message: "Current user fetched successfully"
    })
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const { fullName, email } = req.body

    if(!fullName||!email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        {
            new: true,
        }
    ).select("-password")

    return res.status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})  

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const { oldPassword, newPassword } = req.body
    
    
    if (!oldPassword || !newPassword || oldPassword === newPassword) {
        throw new ApiError(400, 
            !oldPassword || !newPassword 
            ? "All fields are required" 
            : "New password cannot be the same as the old password"
        );
    }

    const user = await User.findById(req.user?._id).select("+password")
    
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    
    if(!isPasswordCorrect) {
        throw new ApiError(400, "Incorrect old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200)
    .json(new ApiResponse(200,{},"Password updated successfully"))
})

const postDoubt = asyncHandler(async (req, res) => {
    const {doubt, code, language} = req.body;

    if (
        [doubt, code, language].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const query = await Query.create({
        doubt,
        code,
        language,
        user: req.user._id
    }) 

    // Respond with the created query
    return res.status(201)
    .json(new ApiResponse(200,query,"Query posted successfully"))
});

const fetchData = asyncHandler(async (req, res) => {
    try {
      const doubts = await Query.find();
      res.json(doubts);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send('Error fetching data'); // Send a server error status
    }
});

const submitAnswer = asyncHandler(async (req, res) => {
    const { doubtId, answerText } = req.body;
    
    if (
        [doubtId, answerText].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    const updatedDoubt = await Query.findByIdAndUpdate(doubtId, {
        answer: answerText
    }, { new: true }); // Returns the updated doubt

    if (!updatedDoubt) {
        throw new ApiError(404, "Doubt not found")
    }

    return res.json(updatedDoubt); // Returns the updated doubt
});

export {
    handleUserSignUp,
    handleUserLogin,
    logoutUser,
    updateAccountDetails,
    getCurrentUser,
    changeCurrentPassword,
    postDoubt,
    fetchData,
    submitAnswer,
};
