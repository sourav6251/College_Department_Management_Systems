import { Notifications } from "../model/notification.model.js";
import { sendResponse } from "../utils/response.handler.js";
import { HTTP_STATUS } from "../constants/statusCode.constants.js";
import { RESPONSE_MESSAGES } from "../constants/responseMessage.constants.js";
import notificationService from "../services/notification.service.js";

class NotificationController {

    async createNotification(req, res) {
        try {
            const notification = await notificationService.createNotification(req.body);

            return sendResponse(res, {
                status: HTTP_STATUS.CREATED,
                message: RESPONSE_MESSAGES.NOTIFOICATION_CREATED,
                success : true ,
                data : notification,
            });
        
        }catch(error) {
           return sendResponse(res, {
            status : HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message : RESPONSE_MESSAGES.INTERNAL_ERROR,
            success : false,
            error : error
           })
        }
    }

    async getNotificationList(req ,res) {
        try{
            const notification = await Notifications.find();
            return sendResponse(res , {
                status : HTTP_STATUS.OK, 
                sucress : true ,
                message : notification.length ? RESPONSE_MESSAGES.FETCH_ALL_NOTIFOICATION : RESPONSE_MESSAGES.NO_NOTIFOICATION, 
                data : notification
            })

        }catch(error){
            console.error("Error => ",error);
            return sendResponse( res , {
                status : HTTP_STATUS.INTERNAL_SERVER_ERROR ,
                message : RESPONSE_MESSAGES.INTERNAL_ERROR, 
                 sucess: false
                 });
        }
    }

    // async showNotification( req , res) {
    //     try{
    //         const notification = await notificationService.updateNotification(req.body);
    //         console.log(`notification => ${notification} `);

            
    //         if (notification) {
    //             return sendResponse(res, {
    //                 status: HTTP_STATUS.OK,
    //                 message: RESPONSE_MESSAGES.NOTIFOICATION_UPDATED,
    //                 success: true,
    //                 data: notification,
    //             });

    //         }

    //         return sendResponse(res ,{
    //             status : HTTP_STATUS.OK,
    //             message : RESPONSE_MESSAGES.NOTIFOICATION_UPDATED,
    //             success : true,
    //             data : notification,
    //         })
    //     }catch(error){
    //         return sendResponse(res , {
    //             status : HTTP_STATUS.INTERNAL_SERVER_ERROR,
    //             message : RESPONSE_MESSAGES.INTERNAL_ERROR,
    //             success : false,
    //             error : error
    //         });

    //     }
    // }



    async updateNotification(req, res) {
        try {
            const notificationExist = await notificationService.findById(req.params.notificationId);

            if(!notificationExist){
                return sendResponse(res, {
                    status: HTTP_STATUS.BAD_REQUEST,
                    message: RESPONSE_MESSAGES.NOTIFOICATION_NOT_EXIST,
                    success: false,
                    
                });
            }
            const notification = await notificationService.updateNotification(req.body, req.params.notificationId);

            return sendResponse(res, {
                status: HTTP_STATUS.OK,
                message: RESPONSE_MESSAGES.NOTIFOICATION_UPDATED,
                success: true,
                data: notification ,
            });

        } catch (error) {
            return sendResponse(res, {
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
                message: RESPONSE_MESSAGES.INTERNAL_ERROR,
                success: false,
                error: error
            });
        }
    }




    async deleteNotification(req,res){
        try{
            const { notificationId } = req.params;
            const notification = await Notifications.findById(notificationId);

            if(!notification){
                return sendResponse(res , { 
                    status : HTTP_STATUS.BAD_REQUEST,
                     message: RESPONSE_MESSAGES.NOTIFOICATION_NOT_FOUND, 
                     sucess : false, 
                    })
            }

            await Notifications.findByIdAndDelete(notificationId);
            return sendResponse(res, { 
                status : HTTP_STATUS.OK,
                message : RESPONSE_MESSAGES.NOTIFOICATION_DELETE,
                sucess : true,
                data : notification 

            });


        }catch(error){
            console.error("error =>", error);
            return sendResponse(res,{
                status: HTTP_STATUS.NOT_FOUND ,
                message : RESPONSE_MESSAGES.NOTIFOICATION_NOT_FOUND,
                sucess : false,

            });

        }
    }
}




 export default new NotificationController();
