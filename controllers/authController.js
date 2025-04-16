import * as signUpServices from "../services/authServices.js";

export const signUpController = async (req, res) => {
  const newUser = await signUpServices.signUpUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export const signInController = async (req, res) => {
  const { email, password } = req.body;
  const token = await signUpServices.signInUser({ email, password });
  res.status(200).json(token);
};

export const getCurrentUserController = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

export const userLogoUtController = async (req, res) => {
  const { id } = req.user;
  await signUpServices.invalidateUserToken(id);
  res.status(204).json();
};

export default {
  signUpController,
  signInController,
  getCurrentUserController,
  userLogoUtController,
};
