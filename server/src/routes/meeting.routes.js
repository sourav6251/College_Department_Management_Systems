import express from "express";
import meetingValidation from "../validations/meeting.validation.js";
import meetingController from "../controller/meeting.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router
    .post("/",
        // validate(meetingValidation.create),
        meetingController.createMeeting)
        // Add this line after existing routes
    .get("/email/:email", meetingController.getMeetingsByEmail)

    .get("/:userid", meetingController.showMeeting)
    .patch("/:meetingId",validate(meetingValidation.update),meetingController.updateMeeting)
    .delete("/:meetingId",validate(meetingValidation.delete),meetingController.deleteMeeting);

export const meetingRouter = router;
 