import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import routineService from "../services/routine.service.js";
// import routineService from "../services/routine.service.js";
import { sendResponse } from "../utils/response.handler.js";

class RoutineController {
    async createRoutine(req, res) {
        try {
            console.log("Enter into createRoutine");
            
            const routine = await routineService.createRoutine(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.ROUTINE_CREATED,
                success: true,
                data: routine,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    async updateRoutine(req, res) {
        try {
            const routine = await routineService.updateRoutine(
                req.params.routineId,
                req.body
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.ROUTINE_UPDATED,
                success: true,
                data: routine,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    async showRoutine(req, res) {
        try {
            const routineId = req.params.userID;
            let routine;
            if (routineId) {
                routine = await routineService.showRoutine(routineId);
            } else {
                routine = await routineService.showRoutine();
            }

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.ROUTINE_GET,
                success: true,
                data: routine,
            });
        } catch (error) {
            console.log(error);

            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    async showRoutineDepartment(req, res) {
        try {
            const routineId = req.params.userID;
            let routine;
            if (routineId) {
                routine = await routineService.showRoutine(routineId);
            } else {
                routine = await routineService.showRoutine();
            }

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.ROUTINE_GET,
                success: true,
                data: routine,
            });
        } catch (error) {
            console.log(error);

            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }

    async deleteRoutine(req, res) {
        try {
            console.log("req.params.routineId=> ",req.params.routineId);
            
            const routine = await routineService.deleteRoutine(
                req.params.routineId
            );
            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.ROUTINE_DELETE,
                success: true,
                data: routine,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error,
            });
        }
    }
}

export default new RoutineController();