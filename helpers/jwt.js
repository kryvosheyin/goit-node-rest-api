import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
};

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
      payload,
      error: null,
    };
  } catch (error) {
    return {
      payload: null,
      error,
    };
  }
};
