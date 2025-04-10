import express from "express"
import notificationController from "../controller/notification.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import notificationValidation from "../validations/notification.validation.js"

const router = express.Router();

router
    .post('/',validate(notificationValidation.create),notificationController.createNotification)
    .get('/', notificationController.getNotificationList)
    .patch('/:notificationId', validate(notificationValidation.update),notificationController.updateNotification)
    .delete('/:notificationId', validate(notificationValidation.delete),notificationController.deleteNotification)

    export const notificationRouter = router;