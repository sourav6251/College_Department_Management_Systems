import express from "express";
// import routineValidation from "../validations/routine.validation.js";
import routineController from "../controller/routine.controller.js";
// import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router
    .post(
        "/",
        // validate(routineValidation.create),
        routineController.createRoutine
    )
    .get("/:userID", routineController.showRoutine)
    .patch(
        "/:routineId",
        // validate(routineValidation.update),
        routineController.updateRoutine
    )
    .delete(
        "/:routineId",
        // validate(routineValidation.delete),
        routineController.deleteRoutine
    );

export const routineRouter = router;