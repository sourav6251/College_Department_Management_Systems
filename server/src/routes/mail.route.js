import express from "express";
import mailController from "../controller/mail.controller.js";

const router = express.Router();

router.post("/", mailController.sendMail);

export const mailRouter = router;
