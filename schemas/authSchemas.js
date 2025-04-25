import Joi from "joi";

import { emailRegex } from "../constants/auth.js";

export const signUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).max(30).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).max(30).required(),
});

export const verifyUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});
