import express from "express";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createUser,
    deleteUser,
    getAllUser,
    logInUser,
    sendOtpForVerifyAccount,
    updateUser,
    VerifyOtpWithExpiry,
} from "../controller/user.controller.js";
import userValidation from "../validations/user.validation.js";
import {
    authorizeRoles,
    isAuthenticate,
} from "../middlewares/authentication.middleware.js";
import { Users } from "../model/user.model.js";

const router = express.Router();

router
    .post(
        "/create",
        validate(userValidation.createUser),
        isAuthenticate,
        authorizeRoles("admin", "hod"),
        createUser
    )
    .post("/login", validate(userValidation.login), logInUser)
    .post(
        "/send-otp",
        validate(userValidation.sendOtp),
        sendOtpForVerifyAccount
    )
    .post(
        "/verify-otp",
        validate(userValidation.verifyOtp),
        VerifyOtpWithExpiry
    )
    .post(
        "/profile-pic-change",
        validate(userValidation.changeProfilePic),
        isAuthenticate
    )
    .patch("/", isAuthenticate, updateUser)
    .delete("/", isAuthenticate, deleteUser)
    .post("/get", isAuthenticate, authorizeRoles("admin", "hod"), getAllUser)
    .get(
        "/getbyfaculty",
        isAuthenticate,
        authorizeRoles("hod"),
        async (req, res) => {
            try {
                const users = await Users.find({
                    role: { $in: ["faculty","hod"] },
                }).select("name email role");
                
                return res.status(200).json({
                    success: true,
                    data: users,
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message || "Failed to fetch users",
                });
            }
        }
    )
    .get(
        "/get-by-roles",
        isAuthenticate,
        authorizeRoles("hod"),
        async (req, res) => {
            try {
                const users = await Users.find({
                    role: { $in: ["hod", "faculty", "external"] },
                }).select("name email role");
                return res.status(200).json({
                    success: true,
                    data: users,
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message || "Failed to fetch users",
                });
            }
        }
    );

export const userRouter = router;
