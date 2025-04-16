import exrepress from "express";
import validateBody from "../helpers/validateBody.js";
import {
  signUpController,
  signInController,
  getCurrentUserController,
  userLogoUtController,
} from "../controllers/authController.js";

import authenticate from "../middlewares/authenticate.js";

import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import errorHandler from "../decorators/errorHandler.js";

const authRouter = exrepress.Router();

authRouter.post(
  "/register",
  validateBody(signUpSchema),
  errorHandler(signUpController)
);

authRouter.post(
  "/login",
  validateBody(signInSchema),
  errorHandler(signInController)
);

authRouter.get(
  "/current",
  authenticate,
  errorHandler(getCurrentUserController)
);

authRouter.post("/logout", authenticate, errorHandler(userLogoUtController));

export default authRouter;
