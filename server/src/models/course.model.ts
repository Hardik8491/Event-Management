import mongoose, { Document, Model, Schema } from "mongoose";
import { Express } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "./user.model";

dotenv.config();

interface IComment extends Document {
    user: IUser;
    question: string;
    questionReplies?: IComment[];
}

interface IReview extends Document {
    user: IUser;
    rating: number;
    comment: string;
    commentReplies: IComment[];
}

interface ILink extends Document {
    title: string;
    url: string;
}

interface ICourseData extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: string;
    videoPlayer: string;
    link: ILink[];
    suggestion: string;
    questions: IComment[];
    //   review: IReview[];
}

export interface ICourse extends Document {
    name: string;
    description: string;
    price: number;
    estimatedPrice?: number;
    thumbnail: string;
    tag?: string;
    level: string;
    demoUrl: string;
    benefits: {
        title: string;
    }[];
    perquisites: { title: string }[];
    reviews: IReview[];
    courseData: ICourseData[];
    rating?: number;
    purchased?: number;
}

const reviewSchema: Schema<IReview> = new Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
    commentReplies: [Object],
});

const linkSchema: Schema<ILink> = new Schema({
    title: String,
    url: String,
});

const commentSchema: Schema<IComment> = new Schema({
    user: Object,
    question: String,
    questionReplies: [Object],
});

const courseDataSchema: Schema<ICourseData> = new Schema({
    title: String,
    description: String,
    videoUrl: String,
    videoSection: String,
    videoLength: String,
    videoPlayer: String,
    link: [linkSchema],
    suggestion: String,
    questions: [commentSchema],
});

const courseSchema: Schema<ICourse> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        estimatedPrice: {
            type: Number,
        },
        thumbnail: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        tag: {
            type: String,
        },
        level: {
            type: String,
            required: true,
        },
        demoUrl: {
            type: String,
            required: true,
        },
        benefits: [
            {
                title: String,
            },
        ],
        perquisites: [
            {
                title: String,
            },
        ],
        reviews: [reviewSchema],
        courseData: [courseDataSchema],
        rating: {
            type: Number,
            default: 0,
        },
        purchased: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default CourseModel;
