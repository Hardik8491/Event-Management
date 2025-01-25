import express from "express";
import {
    getCourseAnalytics,
    getOrderAnalytics,
    getUserAnalytics,
} from "../controllers/analytics.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const analyticsRouter = express.Router();

analyticsRouter.get(
    "/get-users-analytics",
    isAuthenticated,
    authorizeRole("admin"),
    getUserAnalytics
);
analyticsRouter.get(
    "/get-courses-analytics",
    isAuthenticated,
    authorizeRole("admin"),
    getCourseAnalytics
);
analyticsRouter.get(
    "/get-orders-analytics",
    isAuthenticated,
    authorizeRole("admin"),
    getOrderAnalytics
);

export default analyticsRouter;
