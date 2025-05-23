// import express from "express";
// import noticeboardValidation from "../validations/noticeboard.validation.js";
// // import { validate } from "../middlewares/validate.middleware.js";
// import noticeboardController from "../controller/noticeboard.controller.js";
// import { validate } from "../middlewares/validate.middleware.js";

// const router = express.Router();

// router
//     .post('/', noticeboardController.createNotice)
//     .get('/', noticeboardController.showNotices)
//     .patch('/:noticeId',
//         //  validate(noticeboardValidation.update),
//           noticeboardController.updateNotice)
//     .delete('/:noticeId', validate(noticeboardValidation.delete), noticeboardController.deleteNotice);

// export const noticeboardRouter = router;
// noticeboard.routes.js
import express from "express";
import multer from "multer";
import noticeboardValidation from "../validations/noticeboard.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import noticeboardController from "../controller/noticeboard.controller.js";

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage
    // ,
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype === "application/pdf") {
    //         cb(null, true);
    //     } else {
    //         cb(new Error("Only PDF files are allowed"), false);
    //     }
    // },
});

router
    .post('/', upload.single('media'), noticeboardController.createNotice)
    .get('/', noticeboardController.showNotices)
    .patch('/:noticeId', upload.single('media'), noticeboardController.updateNotice)
    .delete('/:noticeId', validate(noticeboardValidation.delete), noticeboardController.deleteNotice);

export const noticeboardRouter = router;
// import express from "express";
// import multer from "multer";
// import noticeboardValidation from "../validations/noticeboard.validation.js";
// import { validate } from "../middlewares/validate.middleware.js";
// import noticeboardController from "../controller/noticeboard.controller.js";

// const router = express.Router();

// // Configure multer to use memory storage
// const storage = multer.memoryStorage(); // Store files in memory as buffers
// const upload = multer({ storage });

// router
//     .post('/', upload.single('media'), noticeboardController.createNotice)
//     .get('/', noticeboardController.showNotices)
//     .patch('/:noticeId', noticeboardController.updateNotice)
//     .delete('/:noticeId', validate(noticeboardValidation.delete), noticeboardController.deleteNotice);

// export const noticeboardRouter = router;