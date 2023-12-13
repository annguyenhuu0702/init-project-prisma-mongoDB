import { Router } from "express";
import { userRouter } from "./userRouter";

export const rootRouter = Router();

rootRouter.use("/user", userRouter);
