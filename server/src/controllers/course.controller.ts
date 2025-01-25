// @ts-nocheck
import { Request, Response, NextFunction, request } from "express";
import dotenv from "dotenv";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { create } from "domain";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import redisClient from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMailer from "../mails/sendMail";
import { authorizeRole } from "../middleware/auth";
dotenv.config();

// upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
 
     
      
      // const thumbnail = data.thumbnail;
      // if (thumbnail) {
      //   const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
      //     folder: "course",
      //   });
      //   data.thumbnail = {
      //     public_id: myCloud.public_id,
      //     url: myCloud.url,
      //   };
      // }
      createCourse(data, res, next);
    
    } catch (error: any) {
   
      
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "course",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;
      const course = await CourseModel.findByIdAndUpdate(courseId, data, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get single course

export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCached = await redisClient.get(courseId);
      if (isCached) {
        const course = JSON.parse(isCached);
        res.status(200).json({ success: true, course });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.link"
        );
        await redisClient.set(courseId, JSON.stringify(course));

        res.status(200).json({ success: true, course });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all course
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCached = await redisClient.get("allCourses");
      if (isCached) {
        const course = JSON.parse(isCached);
        res.status(200).json({ success: true, course });
      } else {
        const course = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.link"
        );
        res.status(200).json({ success: true, course });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course content -- only for valid user
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const courseExist = userCourseList?.find(
        (course: any) => course._id() === courseId
      );
      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// delete course

export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const course = await CourseModel.findByIdAndDelete(courseId);
      if (course) {
        await cloudinary.v2.uploader.destroy(course?.thumbnail?.public_id);
        res.status(200).json({
          success: true,
          message: "Course deleted successfully",
        });
      } else {
        return next(new ErrorHandler("Course not found", 404));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// and question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}
export const addQuestionInCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IAddQuestionData = req.body;
      const course = await CourseModel.findById(data.courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      if (!mongoose.Types.ObjectId.isValid(data.contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const content = course.courseData.find(
        (content) => content._id === data.contentId
      );
      if (!content) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const newQuestion: any = {
        user: req.user,
        question: data.question,
        questionReply: [],
      };
      content.questions.push(newQuestion);
      await course?.save();
      return res.status(200).json({
        success: true,
        message: "Question added successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add answer in course question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IAddAnswerData = req.body;
      const course = await CourseModel.findById(data.courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      if (!mongoose.Types.ObjectId.isValid(data.contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const content = course.courseData.find(
        (content) => content._id === data.contentId
      );
      if (!content) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      const question = content.questions.find((item: any) => {
        item._id.equals(data.questionId);
      });
      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      // create new ans objects
      const newAnswer: any = {
        user: req.user,
        answer: data.answer,
      };
      question.questionReplies?.push(newAnswer);

      await course?.save();
      if (req.user?._id === question.user._id) {
        // notification
      } else {
        const data = {
          name: question.user.name,
          title: content.title,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/activation-mail.ejs"),
          data
        );
        try {
          await sendMailer({
            email: question.user.email,
            subject: "Question Replay",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
      return res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// add review in course
interface IAddReviewData {
  review: string;
  courseId: string;
  rating: string;
  userId: string;
}
export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      // check if courseID already exist useCourseList base on _id
      const courseExists = userCourseList?.some((course: any) => {
        course._id.toString() == courseId.toString();
      });
      if (courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }
      const course = await CourseModel.findById(courseId);
      const { review, rating } = req.body;
      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };
      course?.reviews.push(reviewData);
      let avg = 0;
      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      // --->example of 2 reviews
      // one is 5 and other is 4
      // so maths for 4+5=0
      // avg 9/2= 4.5 ratings

      if (course) {
        let ratings = avg / (course?.reviews.length as number);
        course.rating = ratings;
      }
      await course?.save();
      const notification = {
        title: "New Review Received",
        message: `${req.user?.name} jas given review in ${course?.name}`,
      };

      // create notification

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add replay to review
interface IAddReviewData {
  reviewId: string;
  courseId: string;
  comment: string;
}
export const addReplayToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData;
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      const review: any = course?.reviews.forEach((rev: any) => {
        rev._id.toString() === reviewId;
      });
      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }
      const replayData: any = {
        user: req.user,
        comment,
      };
      if (!review.commentReplies) {
        review.commentReplies = [];
      }
      review.commentReplies.push(replayData);
      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// generate video url
export const generateVideoUrl = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    {
      try {
        const { videoId } = req.body;
        const res = await axios.post(
          `https://dev.vdociper.com/api/videos/${videoId}/otp`,
          { ttl: 300 },
          {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              authorization: `Apisecret ${process.env.VOCHI_SECRATE}`,
            },
          }
        );
        res.json(res.data);
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  }
);
