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

const router = express.Router();

router
    .post(
        "/create",
        validate(userValidation.createUser),
        // isAuthenticate,
        // authorizeRoles("admin", "hod"),
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
    .post("/get", isAuthenticate, authorizeRoles("admin", "hod"), getAllUser);

export const userRouter = router;
