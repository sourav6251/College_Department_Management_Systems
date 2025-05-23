// import syllabusService from "../services/syllabus.service.js";
// import { sendResponse } from "../utils/response.handler.js";
// import { HTTP_STATUS } from "../constants/statusCode.constants.js";
// import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";

// class SyllabusController {
//     async createSyllabus(req, res) {
//         console.log('Enter  into syllabus ');

//         try {
//             const syllabus = await syllabusService.createSyllabus(req.body);
// console.log("syllabus",syllabus);

//             return sendResponse(res, {
//                 status: HTTP_STATUS.CREATED,
//                 message: RESPONSE_MESSAGES.SYLLABUS_CREATED,
//                 success: true,
//                 data: syllabus,
//             });
//         } catch (error) {
//             return sendResponse(res, {
//                 status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
//                 message: RESPONSE_MESSAGES.INTERNAL_ERROR,
//                 success: false,
//                 error: error
//             });
//         }
//     }

//     async updateSyllabus(req, res) {
//         try {
//             const syllabus = await syllabusService.updateSyllabus(req.body, req.params.syllabusId);

//             return sendResponse(res, {
//                 status: HTTP_STATUS.OK,
//                 message: RESPONSE_MESSAGES.SYLLABUS_UPDATED,
//                 success: true,
//                 data: syllabus,
//             });
//         } catch (error) {
//             return sendResponse(res, {
//                 status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
//                 message: RESPONSE_MESSAGES.INTERNAL_ERROR,
//                 success: false,
//                 error: error
//             });
//         }
//     }

//     async showSyllabus(req, res) {
//         try {
//             const syllabus = await syllabusService.showSyllabus(req.params.departmentid);
//             console.log(`syllabus => ${syllabus} `);

//             if (syllabus) {
//                 return sendResponse(res, {
//                     status: HTTP_STATUS.OK,
//                     message: RESPONSE_MESSAGES.SYLLABUS_UPDATED,
//                     success: true,
//                     data: syllabus,
//                 });

//             }

//             return sendResponse(res, {
//                 status: HTTP_STATUS.NO_CONTENT,
//                 message: RESPONSE_MESSAGES.SYLLABUS_UPDATED,
//                 success: true,
//                 data: syllabus,
//             });
//         } catch (error) {
//             return sendResponse(res, {
//                 status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
//                 message: RESPONSE_MESSAGES.INTERNAL_ERROR,
//                 success: false,
//                 error: error
//             });
//         }
//     }

//     async deleteSyllabus(req, res) {
//         try {
//             const syllabus = await syllabusService.deleteSyllabus(req.params.syllabusId);

//             return sendResponse(res, {
//                 status: HTTP_STATUS.OK,
//                 message: RESPONSE_MESSAGES.SYLLABUS_DELETE,
//                 success: true,
//                 data: syllabus,
//             });
//         } catch (error) {
//             return sendResponse(res, {
//                 status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
//                 message: RESPONSE_MESSAGES.INTERNAL_ERROR,
//                 success: false,
//                 error: error
//             });
//         }
//     }
// }
// export default new SyllabusController();

import syllabusService from "../services/syllabus.service.js";
import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";

class SyllabusController {
    async createSyllabus(req, res) {
        console.log("req.body => ", req.body);
        console.log("req.file => ", req.file);

        try {
            const { user, department, semester, paperName, paperCode } =
                req.body;
            const media = req.file;

            const syllabusData = {
                user,
                department,
                semester,
                paperCode,
                paperName,
                media,
            };
            console.log("syllabusData=> ", syllabusData);

            const syllabus = await syllabusService.createSyllabus(syllabusData);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message:
                    RESPONSE_MESSAGES.SYLLABUS_CREATED ||
                    "Syllabus created successfully",
                success: true,
                data: syllabus,
            });
        } catch (error) {
            console.error("Create syllabus error:", error);
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: error.message || RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
            });
        }
    }

    async updateSyllabus(req, res) {
        console.log("req.body => ", req.body);
        console.log("req.file => ", req.file);

        try {
            const id = req.params.syllabusId;
            const { semester, paperCode,paperName } = req.body;
            const media = req.file;

         

            const updateData = {
                semester,
                paperCode,
                paperName,
                media,
            };

            const syllabus = await syllabusService.updateSyllabus(
                id,
                updateData
            );

            if (!syllabus) {
                return sendResponse(res, {
                    status: HTTP_STATUS.NOT_FOUND,
                    message: "Syllabus not found",
                    success: false,
                });
            }
console.log("syllabus=>  ",syllabus);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message:
                    RESPONSE_MESSAGES.SYLLABUS_UPDATED ||
                    "Syllabus updated successfully",
                success: true,
                data: syllabus,
            });
        } catch (error) {
            console.error("Update syllabus error:", error);
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: error.message || RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
            });
        }
    }

    async showSyllabus(req, res) {
        try {
            const syllabus = await syllabusService.showSyllabus(
                req.params.departmentid
            );

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message:
                    RESPONSE_MESSAGES.SYLLABUS_FETCHED ||
                    "Syllabus fetched successfully",
                success: true,
                data: syllabus || [],
            });
        } catch (error) {
            console.error("Show syllabus error:", error);
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
            });
        }
    }

    async deleteSyllabus(req, res) {
        try {
            const syllabus = await syllabusService.deleteSyllabus(
                req.params.syllabusId
            );

            if (!syllabus) {
                return sendResponse(res, {
                    status: HTTP_STATUS.NOT_FOUND,
                    message: "Syllabus not found",
                    success: false,
                });
            }

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message:
                    RESPONSE_MESSAGES.SYLLABUS_DELETE ||
                    "Syllabus deleted successfully",
                success: true,
                data: syllabus,
            });
        } catch (error) {
            console.error("Delete syllabus error:", error);
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
            });
        }
    }
}

export default new SyllabusController();
