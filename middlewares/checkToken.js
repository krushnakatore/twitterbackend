import JWT from "jsonwebtoken";
import { errorHandlerController } from "../error/errorHandler.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(errorHandlerController(401, "User Verification has Failed"));
    }
    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandlerController(404, "Token is Invalid"));
      req.user = user;
      next();
    });
  } catch (err) {
    console.log("Error in verifying user", err);
  }
};
