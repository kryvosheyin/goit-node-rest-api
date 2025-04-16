import exrepress from "express";
import validateBody from "../helpers/validateBody.js";
import authController from "../controllers/authController.js";

import authenticate from "../middlewares/authenticate.js";

import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
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

export default authRouter;
