import axiosInstance from "./axiosInstance";

interface LoginData {
    email: string;
    password: string;
    role: string;
}
class APIStore {
    async syllabusCreate(syllabusData) {
        return await axiosInstance.post("/syllabus", syllabusData);
    }
    async syllabusGet(departmentid) {
        return await axiosInstance.get(`/syllabus/${departmentid}`);
    }
    async syllabusEdit(syllabusId, updateData) {
        return await axiosInstance.patch(`/syllabus/${syllabusId}`, updateData);
    }
    async syllabusDelete(syllabusId) {
        return await axiosInstance.delete(`/syllabus/${syllabusId}`);
    }
    async departmentCreate() {}
    async departmentGet() {}
    async departmentEdit() {}
    async departmentDelete() {}
    async semesterCreate() {}
    async semesterGet() {}
    async semesterEdit() {}
    async semesterDelete() {}
    async userCreate(user: LoginData) {
        return await axiosInstance.post("/user/login", user);
    }
    async memberGetByRole(display) {
        // const response = 
        console.log("display  =>",display);
        
        return await axiosInstance.post("/user/get", {
            role: display,
        });
    }
    async userGetByRole() {
        return await axiosInstance.get("/user/get-by-roles");
    }
    async userEdit() {}
    async userDelete() {}
    async meetingCreate(data) {
        console.log("data=> ", data);

        return await axiosInstance.post("/meeting", data);
    }
    async meetingGet(userId) {
      return  await axiosInstance.get(`/meeting/${userId}`);
    } 
       async meetingGetByEmail(email) {
        return await axiosInstance.get(`/meeting/email/${email}`)
    //   return  await axiosInstance.get(`/meeting/${userId}`);
    }
    async meetingEdit(id,data) {
        await axiosInstance.patch(`/meeting/${id}`, data);
    }
    async meetingDelete(id) {
        return await axiosInstance.delete(`/meeting/${id}`);
    }

    async noticeboardCreate(noticeData: FormData) {
        console.log("noticeData=>  ", noticeData);
        for (const [key, value] of noticeData.entries()) {
            console.log(key, value);
        }
        return await axiosInstance.post("/noticeboard", noticeData);
    }
    async noticeboardGet(departmentID: string) {
        return await axiosInstance.get("/noticeboard", {
            params: { department: departmentID },
        });
    }
    async noticeboardEdit(noticeID, updateData) {
        return await axiosInstance.patch(
            `/noticeboard/${noticeID}`,
            updateData
        );
    }
    async noticeboardDelete(noticeID) {
        return await axiosInstance.delete(`/noticeboard/${noticeID}`);
    }

    async routinesCreate() {}
    async routinesGet() {}
    async routinesEdit() {}
    async routinesDelete(routineId) {
        return await axiosInstance.delete(`/routines/${routineId}`);
    }

    async certificateCreate() {
        // await axiosInstance.post()
    }
    async certificateGet() {}
    async certificateEdit() {}
    async mail() {}
    async meetingMail(To,subject,body) {
        const bodys={
            To:To, subject:subject,body:body
        }
        return await axiosInstance.post(`/mail`,bodys);
    }
}
export default new APIStore();
