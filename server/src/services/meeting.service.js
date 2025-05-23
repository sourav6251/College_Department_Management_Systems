// import { Mettings } from "../model/metting.model.js";


// class MeetingService {
    
//     async createMeeting(data) {
//         let meeting;
//         try {
//             console.log("data234=>",data);
            
//              meeting = await Mettings.create(data);
//              console.log("meeting=>",meeting);
             

//         } catch (error) {
//             console.log("error=>", error);
//         }
//         return meeting;
//     }

//     async showMeeting(data) {
//         // const { user, userhod, email } = data;
//         // const filter = {};

//         // if (user) filter.user = user;
//         // if (userhod) filter.user = userhod;
//         // if (email) filter.joinusList = email;

//         const meetings = await Mettings.find({user:data})
//             // .populate("user", "name email")
//             .select("title description mettingTime joinusList mettingArea");

//         return meetings || null;
//     }

//     async updateMeeting(id, data) {
//         const meeting = await Mettings.findByIdAndUpdate(id, data, {
//             new: true,
//         });
//         return meeting;
//     }

//     async deleteMeeting(id) {
//         const meeting = await Mettings.findByIdAndDelete(id);
//         return meeting;
//     }
// }

// export default new MeetingService();
// import { Mettings } from "../model/meeting.model.js";

import { Mettings } from "../model/metting.model.js";
class MeetingService {
    async createMeeting(data) {
        const { user, title, description, meetingTime, mettingArea, joinusList } = data;

        console.log("Creating meeting with data:", {
            user,
            title,
            description,
            meetingTime,
            mettingArea,
            joinusList,
        });

        try {
            // Validate joinusList emails
            if (joinusList && joinusList.length > 0) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                for (const email of joinusList) {
                    if (!emailRegex.test(email)) {
                        throw new Error(`Invalid email address: ${email}`);
                    }
                }
            }

            const meeting = await Mettings.create({
                user,
                title,
                description,
                mettingTime: meetingTime,
                mettingArea,
                joinusList: joinusList || [],
            });

            console.log("Meeting created successfully:", meeting);
            return meeting;
        } catch (error) {
            console.error("Error in createMeeting:", error);
            throw error;
        }
    }

    async showMeeting(userId) {
        try {
            const meetings = await Mettings.find({ user: userId });
            return meetings || [];
        } catch (error) {
            console.error("Error in showMeeting:", error);
            throw error;
        }
    }

    async updateMeeting(id, data) {
        const { title, description, meetingTime, mettingArea, joinusList } = data;

        try {
            // Validate joinusList emails
            if (joinusList && joinusList.length > 0) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                for (const email of joinusList) {
                    if (!emailRegex.test(email)) {
                        throw new Error(`Invalid email address: ${email}`);
                    }
                }
            }

            const updatedMeeting = await Mettings.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    meetingTime: meetingTime ? new Date(meetingTime) : undefined,
                    mettingArea,
                    joinusList: joinusList || [],
                },
                { new: true, runValidators: true }
            );

            if (!updatedMeeting) {
                throw new Error("Meeting not found");
            }

            console.log("Meeting updated successfully:", updatedMeeting);
            return updatedMeeting;
        } catch (error) {
            console.error("Error in updateMeeting:", error);
            throw error;
        }
    }

    async deleteMeeting(id) {
        try {
            const meeting = await Mettings.findByIdAndDelete(id);
            if (!meeting) {
                throw new Error("Meeting not found");
            }
            return meeting;
        } catch (error) {
            console.error("Error in deleteMeeting:", error);
            throw error;
        }
    }
}

export default new MeetingService();