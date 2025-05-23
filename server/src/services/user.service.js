import { sendEmail } from "../utils/sendMail.js";
import { genarate6DigitOtp } from "../utils/OtpGenarate.js";
// import { fileDestroy, fileUploader } from "../utils/fileUpload.js";
import { timeExpire } from "../utils/timeExpire.js";
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
                // if (!body.semester || !body.paperCode || !body.paperName) {
                //     throw new Error("Semester, paperCode, and paperName are required for external users");
                // }
                await Externals.create({
                    user: user._id,
                    department: body.department,
                    // semester: body.semester,
                    // paperCode: body.paperCode,
                    // paperName: body.paperName,
                });
            }
        } catch (error) {
            // Rollback user creation if role-specific record creation fails
            await Users.findByIdAndDelete(user._id);
            throw new Error(`Failed to create ${body.role} record: ${error.message}`);
        }

        // const otp = genarate6DigitOtp();
        // user.otp = otp;
        // user.otpExpiary = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        // await user.save();

        await sendEmail(
            user.email,
            `Welcome ${user.name} 🎉`,
            `Thank you for joining <strong>PBC-Online</strong> – your trusted digital companion for academic growth and collaboration. <br><br>We're thrilled to have you on board! Whether you're a teacher, student, faculty member, or external learner, PBC-Online is here to support your journey with the right tools, resources, and community. <br><br>Start exploring and make the most of everything we offer. Let's grow together! 💡📚`
        );

        // await sendEmail(user.email, "Verify Account - OTP", otp);
        // sendCookie(user, res, "user create successfully", 200);
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

    // async loginUser(body, res) {
    //     // console.log(body , "------------------------------------");

    //     const { email, role, password } = body;
    //     const user = await Users.findOne({ email: email, role: role }).select(
    //         "+password"
    //     );
    //     console.log(user);

    //     if (!user || !(await user.comparePassword(password))) {
    //         throw new Error("Invalid email or password");
    //     }
    //     sendCookie(user, res, "user login successfully", 200);
    // },

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
                $match: { _id: new mongoose.Types.ObjectId(id) }, // Match the user by ID
            },

            {
                $lookup: {
                    from: "users", // Collection name should match MongoDB collection (pluralized)
                    localField: "friends",
                    foreignField: "_id",
                    as: "friends",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "friendsRequast", // Ensure the field name matches the schema
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
                    totalFriends: { $size: "$friends" }, // Calculate total number of friends
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

    // async getAllUser(userId) {
    // async getAllUser({role}) {
    //     console.log("role=>",role);
        
    //     const user= await Users.find({ role})
    //         .populate("department", "name") // Populate department name
    //         .select("name email mobile role department");
    //         console.log(user);
            
    //         return user;
    // },

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
    

    // async changeProfilePic(id, file) {
    //     const user = await Users.findById(id);
    //     if (!user) {
    //         throw new Error("User not found");
    //     }

    //     if (user.profile_pic?.public_id) {
    //         await fileDestroy(user.profile_pic.public_id);
    //     }

    //     const { url, public_id, error } = await fileUploader(file);
    //     if (error) {
    //         throw new Error("File upload failed");
    //     }

    //     user.profile_pic = { url, public_id };
    //     await user.save();
    //     return user;
    // },

    async deleteUser(id) {
        return await Users.findByIdAndDelete(id);
    },

    async updateUser(id, updateData) {
        return await Users.findByIdAndUpdate(id, updateData, { new: true });
    },
};
