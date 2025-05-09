import authServices from "../services/authServices.js";
import fs from "node:fs/promises";
import path from "node:path";

const avatarDir = path.resolve("public", "avatars");

const signUpController = async (req, res) => {
  const newUser = await authServices.signUpUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatar: newUser.avatarURL,
  });
};

const verifyUserController = async (req, res) => {
  const { verificationToken } = req.params;
  await authServices.verifyUser(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

const resendVerificationController = async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerificationEmail(email);
  res.status(200).json({ message: "Verification email sent" });
};

const signInController = async (req, res) => {
  const { email, password } = req.body;
  const token = await authServices.signInUser({ email, password });
  res.status(200).json(token);
};

const getCurrentUserController = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const userLogoUtController = async (req, res) => {
  const { id } = req.user;
  await authServices.invalidateUserToken(id);
  res.status(204).json();
};

const updateSubscriptionController = async (req, res) => {
  const { email } = req.user;
  const { subscription } = req.body;
  await authServices.updateSubscription(email, subscription);
  res
    .status(200)
    .json({ message: `Subscription for ${email} updated to ${subscription}` });
};

const updateAvatarController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please attach the file" });
  }
  const { email } = req.user;
  const { path: originalPath, filename } = req.file;
  const newPath = path.join(avatarDir, filename);
  await fs.rename(originalPath, newPath);
  const avatar = path.join("avatars", filename);

  await authServices.updateAvatarUrl(email, avatar);
  res.status(200).json({ avatarUrl: avatar });
};

export default {
  signUpController,
  signInController,
  getCurrentUserController,
  userLogoUtController,
  updateSubscriptionController,
  updateAvatarController,
  verifyUserController,
  resendVerificationController,
};
