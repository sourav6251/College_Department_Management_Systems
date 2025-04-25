import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import semesterController from "../controller/semester.controller.js";
import semesterValidation from "../validations/semester.validation.js";
import { authorizeRoles, isAuthenticate } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router
    .post('/', validate(semesterValidation.create),  isAuthenticate , authorizeRoles("admin" , "hod") ,  semesterController.createSemester)
    .get('/semester-details/:semesterId', semesterController.showSemester)
    .get('/:departmentId', semesterController.showAllSemester)
    .patch('/:semesterId', isAuthenticate , authorizeRoles("admin" , "hod") , validate(semesterValidation.update), semesterController.updateSemester)
    .delete('/:semesterId', isAuthenticate , authorizeRoles("admin" , "hod") , validate(semesterValidation.delete), semesterController.deleteSemester);

export const semesterRouter = router;
