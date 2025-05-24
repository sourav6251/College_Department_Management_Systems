import express from "express";
// import routineValidation from "../validations/routine.validation.js";
import routineController from "../controller/routine.controller.js";
import { isAuthenticate } from "../middlewares/authentication.middleware.js";
// import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router
    .post(
        "/",
        isAuthenticate,
        routineController.createRoutine
    )
    .get("/:userID", routineController.showRoutine)
    .get("/department/:departmentID", routineController.showRoutineDepartment)
    .patch(
        "/:routineId",
        isAuthenticate,
        routineController.updateRoutine
    )
    .delete(
        "/:routineId",
        isAuthenticate,
        routineController.deleteRoutine
    );

export const routineRouter = router;