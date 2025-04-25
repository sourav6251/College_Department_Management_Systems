import { Noticeboard } from "../model/noticeboard.model.js";

class NoticeboardService {
    async createNotice(data) {
        console.log('data\n\n\n',data);
        
        const notice = await Noticeboard.create(data);
        return notice;
    }

    async showNotices(filterData) {
        const { user, department } = filterData;
        const filter = {};

        if (user) filter.user = user;
        if (department) filter.department = department;

        const notices = await Noticeboard.find(filter)
            .select("title description media createdAt");

        return notices || null;
    }

    async updateNotice(id, data) {
        const notice = await Noticeboard.findByIdAndUpdate(id, data, {
            new: true,
        });
        return notice;
    }

    async deleteNotice(id) {
        const notice = await Noticeboard.findByIdAndDelete(id);
        return notice;
    }
}

export default new NoticeboardService();
