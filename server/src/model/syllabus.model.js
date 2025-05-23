// import { model, Schema } from "mongoose";


// const media=new Schema({
//     mediaUrl: {
//         type: String,
//         required: [true, "media url is required !"],
//         maxLength: [100, "media url should be in 100 letter"],
//         minLength: [3, "media url must be in 3 letter "],
//         trim: true,
//     },
//     mediaID: {
//         type: String,
//         required: [true, "media id is required !"],
//         maxLength: [100, "media id should be in 100 letter"],
//         minLength: [3, "media id must be in 3 letter "],
//         trim: true,
//     },
// },{ timestamps: true });
// const syllabusSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: "user",
//         required: true,
//     },
//     department: {
//         type: Schema.Types.ObjectId,
//         ref: "department",
//         required: true,
//     },
//     semester: {
//         type: String,
//         ref: "semester",
//         required: true,
//     },
//     paperCode: {
//         type: String,
//         required: [true, "paper code is required !"],
//         maxLength: [10, "paper code should be in 10 letter"],
//         minLength: [3, "paper code must be in 3 letter "],
//         trim: true,
//     },
//     media: [media],
// }, { timestamps: true });



// export const Syllabus = model("syllabus", syllabusSchema);


import { model, Schema } from "mongoose";

const mediaSchema = new Schema({
    mediaUrl: {
        type: String,
        required: [true, "Media URL is required"],
        maxLength: [100, "Media URL should be at most 100 characters"],
        minLength: [3, "Media URL must be at least 3 characters"],
        trim: true,
    },
    public_id: {
        type: String,
        required: [true, "Public ID is required"],
        maxLength: [100, "Public ID should be at most 100 characters"],
        minLength: [3, "Public ID must be at least 3 characters"],
        trim: true,
    },
}, { timestamps: true });

const syllabusSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "department",
        required: true,
    },
    semester: {
        type: String,
        ref: "semester",
        required: true,
    },
    paperCode: {
        type: String,
        required: [true, "Paper code is required"],
        maxLength: [10, "Paper code should be at most 10 characters"],
        minLength: [3, "Paper code must be at least 3 characters"],
        trim: true,
    },
    paperName: {
        type: String,
        // required: [true, "Paper name is required"],
        maxLength: [10, "Paper name should be at most 10 characters"],
        minLength: [3, "Paper name must be at least 3 characters"],
        trim: true,
    },
    media: [mediaSchema],
}, { timestamps: true });

export const Syllabus = model("syllabus", syllabusSchema);