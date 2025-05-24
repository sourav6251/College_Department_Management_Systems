import { sendEmail } from "../utils/sendMail.js";
import { genarate6DigitOtp } from "../utils/OtpGenarate.js";
import { Users } from "../model/user.model.js";

import mongoose from "mongoose";
import { sendCookie } from "../utils/tokenGenarate.js";
import { Hods } from "../model/hod.model.js";
import { Externals } from "../model/external.model.js";
import { Facultys } from "../model/faculty.model.js";
import { Students } from "../model/student.model.js";

export const UserService = {
    async createUser(userData, body, res) {
        console.log("ok created account ");
        if (
            userData.role === "hod" &&
            (body.role === "hod" || body.role === "admin")
        ) {
            throw new Error("Access denied !");
        }
console.log("body=>",body);


        // step1 : email exist or not
        const { email } = body;
        const isExist = await Users.findOne({ email });
        if (isExist) {
            throw new Error("User alrady exist ");
        }

        const user = await Users.create(body);

        try {
            if (body.role === "hod") {
                await Hods.create({
                    user: user._id,
                    department: body.department,
                });
            } else if (body.role === "faculty") {
                await Facultys.create({
                    user: user._id,
                    department: body.department,
                    subjects: body.subjects || [], // Optional subjects array
                });
            } else if (body.role === "student") {
                await Students.create({
                    user: user._id,
                    department: body.department,
                    semester: body.semester || null, // Optional semester
                });
            } else if (body.role === "external") {
           
                await Externals.create({
                    user: user._id,
                    department: body.department,
                });
            }
        } catch (error) {
            // Rollback user creation if role-specific record creation fails
            await Users.findByIdAndDelete(user._id);
            throw new Error(`Failed to create ${body.role} record: ${error.message}`);
        }

        await sendEmail(
            user.email,
            `Welcome ${user.name} 🎉`,
            `Thank you for joining <strong>PBC-Online</strong> – your trusted digital companion for academic growth and collaboration. <br><br>We're thrilled to have you on board! Whether you're a teacher, student, faculty member, or external learner, PBC-Online is here to support your journey with the right tools, resources, and community. <br><br>Start exploring and make the most of everything we offer. Let's grow together! 💡📚`
        );

        return user;
    },

    async verifyOtp(otp) {
        const user = await Users.findOne({
            otp,
            otpExpiary: { $gt: Date.now() },
        });
        if (!user) {
            throw new Error("Invalid OTP");
        }

        user.otp = null;
        user.otpExpiary = null;
        user.isVerify = true;
        await user.save();
        return user;
    },

    async sendOtpForVerification(email) {
        const user = await Users.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const otp = genarate6DigitOtp();
        user.otp = otp;
        user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        await user.save();
        await sendEmail(email, "Verify Account - OTP", otp);
    },

    async loginUser(body, res) {
        const { email, role, password } = body;
    console.log("body=>",body);
    
        // 1. Find user
        const user = await Users.findOne({ email, role }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            throw new Error("Invalid email or password");
        }
    
        // 2. Fetch departmentId based on role
        let departmentId = null;
        let department = null;
    
        switch (role) {
            case "hod":
                const hod = await Hods.findOne({ user: user._id }).populate("department", "_id name");
                departmentId = hod?.department?._id;
                console.log("hod?.department=> ",hod?.department);
                
                department = hod?.department?.name;
                break;
    
            case "faculty":
                const faculty = await Facultys.findOne({ user: user._id }).populate("department", "_id name");
                departmentId = faculty?.department?._id;
                department = faculty?.department?.name;
                break;
    
            case "student":
                const student = await Students.findOne({ user: user._id }).populate("department", "_id name");
                departmentId = student?.department?._id;
                department = student?.department?.name;
                break;
    
            case "external":
                const external = await Externals.findOne({ user: user._id }).populate("department", "_id name");
                departmentId = external?.department?._id;
                department = external?.department?.name;
                break;
    
            default:
                break;
        }
    
        user._doc.departmentId = departmentId || null;
        user._doc.department = department || null;
        console.log("department=> ",department);
        
        // 3. Send response
        sendCookie(user, res, "user login successfully", 200, );
    },
    async getUserById(id) {
        const user = await Users.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }, 
            },

            {
                $lookup: {
                    from: "users", 
                    localField: "friends",
                    foreignField: "_id",
                    as: "friends",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "friendsRequast",
                    foreignField: "_id",
                    as: "friendRequests",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "sendFriendRequst",
                    foreignField: "_id",
                    as: "sentFriendRequests",
                },
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    profile_pic: 1,
                    totalFriends: { $size: "$friends" }, 
                    friends: { _id: 1, name: 1, email: 1, profile_pic: 1 },
                    friendRequests: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        profile_pic: 1,
                    },
                    sentFriendRequests: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        profile_pic: 1,
                    },
                },
            },
        ]);

        if (!user) throw new Error("User not found");
        console.log("user ========> ", user);

        return user;
    },

    async  getAllUser({ role }) {
        console.log("role=>", role);
    
        const users = await Users.find({ role })
            .select("name email role"); // no .populate("department") here
    
        const results = await Promise.all(users.map(async (user) => {
            let department = null;
    
            if (role === "hod") {
                const hod = await Hods.findOne({ user: user._id }).populate("department", "name");
                department = hod?.department?.name || null;
            } else if (role === "faculty") {
                const faculty = await Facultys.findOne({ user: user._id }).populate("department", "name");
                department = faculty?.department?.name || null;
            } else if (role === "student") {
                const student = await Students.findOne({ user: user._id }).populate("department", "name");
                department = student?.department?.name || null;
            } else if (role === "external") {
                const external = await Externals.findOne({ user: user._id }).populate("department", "name");
                department = external?.department?.name || null;
            }
    
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department
            };
        }));
    
        return results;
    },
    


    async deleteUser(id) {
        return await Users.findByIdAndDelete(id);
    },

    async updateUser(id, updateData) {
        return await Users.findByIdAndUpdate(id, updateData, { new: true });
    },

    async getUsersByDepartment(departmentId) {
        if (!mongoose.Types.ObjectId.isValid(departmentId)) {
            throw new Error("Invalid department ID");
        }
    
        const hods = await Hods.find({ department: departmentId })
            .populate({
                path: 'user',
                select: 'email name role'
            });
    
        const faculties = await Facultys.find({ department: departmentId })
            .populate({
                path: 'user',
                select: 'email name role'
            });
    
        const students = await Students.find({ department: departmentId })
            .populate({
                path: 'user',
                select: 'email name role'
            });
    
        const externals = await Externals.find({ department: departmentId })
            .populate({
                path: 'user',
                select: 'email name role'
            });
    
        const result = {
            hods: hods.map(hod => ({
                _id: hod.user._id,
                email: hod.user.email,
                name: hod.user.name,
                role: hod.user.role
            })),
            faculties: faculties.map(faculty => ({
                _id: faculty.user._id,
                email: faculty.user.email,
                name: faculty.user.name,
                role: faculty.user.role
            })),
            students: students.map(student => ({
                _id: student.user._id,
                email: student.user.email,
                name: student.user.name,
                role: student.user.role
            })),
            externals: externals.map(external => ({
                _id: external.user._id,
                email: external.user.email,
                name: external.user.name,
                role: external.user.role
            }))
        };
    
        return result;
    }
};
