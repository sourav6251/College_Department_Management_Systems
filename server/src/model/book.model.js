import { Schema } from "mongoose";


const ratting = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be 1 or more'],
        max: [5, 'Rating must be 5 or less'],
        default: 0
    }
}, { timestamps: true })


const bookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Book Name must be required !'],
        maxLength: [60, "Book Name must be under 60 char"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "title must be under 500 char"]
    },
    autherName: {
        type: String,
        required: [true, 'Auther Name must be required !'],
        maxLength: [100, "Auther Name must be under 100 char"],
        trim: true,
    },
    publiceDate: {
        type: Date,
        // required: [true, 'Publice Date must be required !'],
        default: null
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be 1 or more'],
        max: [5, 'Rating must be 5 or less'],
        default: 0
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    ratings: [
        ratting
    ]



}, { timestamps: true })


export const Books = model("book", bookSchema)