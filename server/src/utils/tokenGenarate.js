
import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
    console.log(
        "---------------------",
        user,
        message,
        statusCode,
        "-------------------->"
    );

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

    // Set cookie options
    const cookieOptions = {
        httpOnly: true, // Prevent JavaScript access for security
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
        path: "/", 
    };

    return res
        .status(statusCode)
        .cookie("token", token, cookieOptions) 
        .json({
            success: true,
            message,
            data: user,
            token: token,
        });
};
