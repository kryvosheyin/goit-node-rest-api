import * as authServices from "../services/authServices.js";

const signUpController = async (req, res) => {
  const newUser = await authServices.signUpUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
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

export default {
  signUpController,
  signInController,
  getCurrentUserController,
  userLogoUtController,
  updateSubscriptionController,
};
