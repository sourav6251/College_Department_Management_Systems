import { Notifications } from "../model/notification.model.js"

class NotificationService {
    async createNotification(data) {
        const notification = await Notifications.create(data);
        return notification;
    }

    async updateNotification(data, id) {
        const notification = await Notifications.findByIdAndUpdate(id, data, { new: true });
        return notification;
    }

   
    async getNotificationList(data) {
        const title = data.title;
        const description = data.description;
        const department = data.department;
        const filter = { department };

        if (title) filter.title = title ;
        if (description) filter.description = description;
        if (department) filter.department = department;

        const notification = await Notifications.find(filter).select("media");
        console.log(`notification=>${notification}`);
        

        return notification || null;
    }

    async deleteNotification(id) {
        const result = await Notifications.findByIdAndDelete(id);
        return result;
    }

    async findById(id){
        return await Notifications.findById(id);
    }

}
export default new NotificationService();
