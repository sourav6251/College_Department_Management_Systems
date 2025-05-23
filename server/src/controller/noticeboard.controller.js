import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import noticeboardService from "../services/notice.service.js";
import { sendResponse } from "../utils/response.handler.js";

class NoticeboardController {
    async createNotice(req, res) {
        console.log("req.body => ", req.body);
        console.log("req.file => ", req.file);

        try {
            const { user, department, title, description } = req.body;
            const media = req.file;

            if (!user || !department || !title || !description) {
                return sendResponse(res, {
                    status: HTTP_STATUS.BAD_REQUEST,
                    message: "Missing required fields",
                    success: false,
                });
            }

            const noticeData = {
                user,
                department,
                title,
                description,
                media,
            };

            const notice = await noticeboardService.createNotice(noticeData);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.NOTICE_CREATED || "Notice created successfully",
                success: true,
                data: notice,
            });
        } catch (error) {
            console.error("Create notice error:", error);
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: error.message || RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
            });
        }
    }

    async showNotices(req, res) {
        try {
            const filterData = {
                user: req.query.user,
                department: req.query.department,
            };

            const notices = await noticeboardService.showNotices(filterData);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.FETCH_SUCCESS || "Notices fetched successfully",
                success: true,
                data: notices,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error,
            });
        }
    }

    async updateNotice(req, res) {
        console.log("req.body => ", req.body);
        console.log("req.file => ", req.file);

        try {
            const id = req.params.noticeId;
            const { title, description } = req.body;
            const media = req.file;

            // Validate required fields
            if (!title || !description) {
                return sendResponse(res, {
                    status: HTTP_STATUS.BAD_REQUEST,
                    message: "Title and description are required",
                    success: false,
                });
            }

            // Validate title and description length
            if (title.length < 3 || title.length > 60) {
                return sendResponse(res, {
                    status: HTTP_STATUS.BAD_REQUEST,
                    message: "Title must be 3-60 characters",
                    success: false,
                });
            }
            if (description.length < 3 || description.length > 500) {
                return sendResponse(res, {
                    status: HTTP_STATUS.BAD_REQUEST,
                    message: "Description must be 3-500 characters",
                    success: false,
                });
            }

            const updateData = {
                title,
                description,
                media,
            };

            const updatedNotice = await noticeboardService.updateNotice(id, updateData);

            if (!updatedNotice) {
                return sendResponse(res, {
                    status: HTTP_STATUS.NOT_FOUND,
                    message: "Notice not found",
                    success: false,
                });
            }

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.NOTICE_UPDATED || "Notice updated successfully",
                success: true,
                data: updatedNotice,
            });
        } catch (error) {
            console.error("Update notice error:", error);
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: error.message || RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
            });
        }
    }

    async deleteNotice(req, res) {
        try {
            const id = req.params.noticeId;
            const deletedNotice = await noticeboardService.deleteNotice(id);

            if (!deletedNotice) {
                return sendResponse(res, {
                    status: HTTP_STATUS.NOT_FOUND,
                    message: "Notice not found",
                    success: false,
                });
            }

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.NOTICE_DELETED || "Notice deleted successfully",
                success: true,
                data: deletedNotice,
            });
        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error,
            });
        }
    }
}

export default new NoticeboardController();
