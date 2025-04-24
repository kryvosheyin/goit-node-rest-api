import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import gravatar from "gravatar";
import { generateToken } from "../helpers/jwt.js";

dotenv.config();

const findUser = async (query) => User.findOne({ where: query });

const signUpUser = async (userData) => {
  const { email, password } = userData;
  const avatarUrl = gravatar.url(email, { protocol: "http", s: "100" });
  const existingUser = await findUser({ email });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...userData,
    avatarUrl,
    password: hashedPassword,
  });
  return user;
};

const signInUser = async (userData) => {
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

const invalidateUserToken = async (userId) => {
  const user = await findUser({ id: userId });
  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }
  await user.update({ token: null });
  return user;
};

const updateSubscription = async (email, subscription) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await user.update({ subscription });
  return user;
};

const updateAvatarUrl = async (email, avatar) => {
  if (avatar === undefined) {
    throw HttpError(400, "Please provide an avatar");
  }
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await user.update({ avatarUrl: avatar });
};

export default {
  findUser,
  signUpUser,
  signInUser,
  invalidateUserToken,
  updateSubscription,
  updateAvatarUrl,
};
