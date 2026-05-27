import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';
import  Contact  from '../models/contactUs.model.js';
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate access token and refresh token
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});       
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, 'Failed to generate tokens');
    }
}

// create user getStarted
export const registerUser = asyncHandler(async (req, res) => {

    const { token } = req.body;

    if (!token) {
        throw new ApiError(400, "Google token is required");
    }

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
        throw new ApiError(400, "Invalid Google authentication");
    }

    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            email,
            username: name.replace(/\s+/g, "").toLowerCase(),
            picture
        });
    } else {
        user.picture = picture;
        await user.save({ validateBeforeSave: false });
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };

    res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                { user,accessToken },
                "User login successfully"
            )
        );
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: null }
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponse(
                200,
                null,
                "Logout successful"
            )
        );
});

// refresh access token
export const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token required");
    }

    try {

        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken.userId);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token expired or used");
        }

        const { accessToken, refreshToken } =
            await generateAccessTokenAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        };

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken },
                    "Access token refreshed successfully"
                )
            );

    } catch (error) {
        throw new ApiError(401, "Invalid refresh token");
    }

});

// get user
export const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("-refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user },
                "User retrieved successfully"
            )
        );
});

// contact us
export const contactus = asyncHandler(async(req,res)=>{
     const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const contact = await Contact.create({
    name,
    email,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: contact,
  });
})