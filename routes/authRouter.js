import exrepress from "express";
import validateBody from "../helpers/validateBody.js";
import authController from "../controllers/authController.js";
import upload from "../middlewares/upload.js";

import authenticate from "../middlewares/authenticate.js";

import {
  signUpSchema,
  signInSchema,
  verifyUserSchema,
} from "../schemas/authSchemas.js";
import errorHandler from "../decorators/errorHandler.js";

const authRouter = exrepress.Router();

authRouter.post(
  "/register",
  validateBody(signUpSchema),
  errorHandler(authController.signUpController)
);

authRouter.post(
  "/login",
  validateBody(signInSchema),
  errorHandler(authController.signInController)
);

authRouter.get(
  "/verify/:verificationToken",
  errorHandler(authController.verifyUserController)
);

authRouter.post(
  "/verify",
  validateBody(verifyUserSchema),
  errorHandler(authController.resendVerificationController)
);

authRouter.get(
  "/current",
  authenticate,
  errorHandler(authController.getCurrentUserController)
);

authRouter.post(
  "/logout",
  authenticate,
  errorHandler(authController.userLogoUtController)
);

authRouter.patch(
  "/subscription",
  authenticate,
  errorHandler(authController.updateSubscriptionController)
);

authRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  errorHandler(authController.updateAvatarController)
);

export default authRouter;
