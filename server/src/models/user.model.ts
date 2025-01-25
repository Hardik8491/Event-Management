import mongoose, { Document, Model, Schema } from "mongoose";
import e, { Express } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export interface IUser extends Document {
  name: string;
  email: string;
  publicName: string;
  publicEmail: string;
  description: string;
  publicLocation: string;
  publicWebsite: string;
  password: string;
  isAdmin: boolean;
  location: string;
  bio: string;
  website: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string | any }>;
  comparePassword: (password: string) => Promise<boolean>;
  signAccessToken: () => Promise<string>;
  signRefreshToken: () => Promise<string>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegex.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    publicName: {
      type: String,
    },
    publicEmail: {
      type: String,
      validate: {
        validator: function (value: string) {
          return emailRegex.test(value);
        },
        message: "Please enter a valid email for publicEmail",
      },
    },
    description: {
      type: String,
    },
    publicLocation: {
      type: String,
    },
    publicWebsite: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: [6, "password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

// hash password before saving user
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// sign jwt access token
userSchema.methods.signAccessToken = async function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// sign jwt refresh token
userSchema.methods.signRefreshToken = async function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
