import express from "express";
import noticeboardValidation from "../validations/noticeboard.validation.js";
// import { validate } from "../middlewares/validate.middleware.js";
import noticeboardController from "../controller/noticeboard.controller.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router
    .post('/', noticeboardController.createNotice)
    .get('/', noticeboardController.showNotices)
    .patch('/:noticeId',
        //  validate(noticeboardValidation.update),
          noticeboardController.updateNotice)
    .delete('/:noticeId', validate(noticeboardValidation.delete), noticeboardController.deleteNotice);

export const noticeboardRouter = router;
