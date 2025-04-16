import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { generateToken } from "../helpers/jwt.js";

dotenv.config();

export const findUser = async (query) => User.findOne({ where: query });

export const signUpUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });
  return user;
};

export const signInUser = async (userData) => {
  const { email, password } = userData;
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const IsValidPassord = await bcrypt.compare(password, user.password);
  if (!IsValidPassord) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { email };
  const token = generateToken(payload);

  await user.update({ token });
  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};

export const invalidateUserToken = async (userId) => {
  const user = await findUser({ id: userId });
  if (!use || !user.token) {
    throw HttpError(401, "Not authorized");
  }
  await user.update({ token: null });
  return user;
};
