import userModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { comparePassword } from "../authHelpers/authHelpers.js";
import { errorHandlerController } from "../error/errorHandler.js";

export const signUpController = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = await new userModel({ ...req.body, password: hash }).save();

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token)
      .status(200)
      .send({ user: othersData, access_token: token });
  } catch (err) {
    console.log("Error getting user", err);
  }
};

export const signInController = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
      return next(errorHandlerController(404, "User not found"));
    }

    const match = await comparePassword(req.body.password, user.password);

    if (!match) {
      return next(
        errorHandlerController(404, "Username or Password not match")
      );
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token)
      .status(200)
      .send({ user: othersData, access_token: token });
  } catch (err) {
    console.log("Error getting user", err);
  }
};
