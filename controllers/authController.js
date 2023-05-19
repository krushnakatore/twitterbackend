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
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ success: true, message: "Sign Up Succesfully", othersData });
  } catch (err) {
    console.log("Error getting user", err);
  }
};

export const signInController = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await userModel.findOne({ username });

    const match = await comparePassword(req.body.password, user.password);

    if (!match) {
      return next(errorHandlerController(404, "User not found"));
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...othersData } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ success: true, message: "Signed in Succesfully", othersData });
  } catch (err) {
    console.log("Error getting user", err);
  }
};
