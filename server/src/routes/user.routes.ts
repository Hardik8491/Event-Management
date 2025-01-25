import express, { Router } from "express";
import {
    activationUser,
    deleteUser,
    getAllUser,
    getUserInfo,
    loginUser,
    logoutUser,
    registrationUser,
    socialAuth,
    updateAccessToken,
    updateProfilePicture,
    updateUserInfo,
    updateUserPassword,
    updateUserRole,
} from "../controllers/user.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registrationUser);
userRouter.post("/activation-user", activationUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", isAuthenticated, updateUserPassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);
userRouter.get(
    "/get-users",
    isAuthenticated,
    authorizeRole("admin"),
    getAllUser
);
userRouter.put("/updated-user", isAuthenticated, updateUserRole);
userRouter.delete("/delete-user/:id", isAuthenticated, deleteUser);
export default userRouter;
