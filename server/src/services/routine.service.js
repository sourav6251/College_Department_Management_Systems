import { Routines } from "../model/routine.model.js";



class RoutineService {
    async createRoutine(data) {
        const routine = await Routines.create(data);
        return routine;
    }

    async showRoutine(userID) {
        let routines;
        if (userID) {
            routines = await Routines.find({user:userID})
                .populate("user", "name email")
                .populate("department", "name")
                .populate("semester", "name")
                .populate("schedules.timeSlots.professor", "name email");
        } else {
            routines = await Routines.find()
                .populate("user", "name email")
                .populate("department", "name")
                .populate("semester", "name")
                .populate("schedules.timeSlots.professor", "name email");
        }

        return routines || null;
    }


    async showRoutineDepartment(departmentID) {
        let routines;
        if (departmentID) {
            routines = await Routines.find({department:departmentID})
                .populate("user", "name email")
                .populate("department", "name")
                .populate("semester", "name")
                .populate("schedules.timeSlots.professor", "name email");
        } 
       

        return routines || null;
    }

    async updateRoutine(id, data) {
        const routine = await Routines.findByIdAndUpdate(id, data, {
            new: true,
        });
        return routine;
    }

    async deleteRoutine(id) {
        const routine = await Routines.findByIdAndDelete(id);
        return routine;
    }
}

export default new RoutineService();