import { errorHandlerController } from "../error/errorHandler.js";
import userModel from "../models/userSchema.js";
import tweetModel from "../models/tweetSchema.js";

export const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log("Error getting user", err);
  }
};

export const updateUserController = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updateUser);
    } catch (err) {
      console.log("Error getting user", err);
    }
  } else {
    return next(
      errorHandlerController(403, "You can only update your own account")
    );
  }
};

export const deleteUserController = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      await tweetModel.remove({ userId: req.params.id });

      return res
        .status(200)
        .send({ success: true, message: "User Deleted Successfully", user });
    } catch (err) {
      console.log("Error getting user", err);
    }
  } else {
    return next(
      errorHandlerController(403, "You can only Delete your own account")
    );
  }
};

export const followController = async (req, res, next) => {
  try {
    //user
    const user = await userModel.findById(req.params.id);

    const currentUser = await userModel.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $push: { following: req.params.id },
      });
    } else {
      res.status(403).json("You already Following this User");
    }

    res.status(200).json("Following the User");
  } catch (err) {
    return next(errorHandlerController(403, "Error in Following the user"));
  }
};

export const unFollowController = async (req, res, next) => {
  try {
    //user
    const user = await userModel.findById(req.params.id);

    const currentUser = await userModel.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $pull: { following: req.params.id },
      });
    } else {
      res.status(403).json("You are not Following this User");
    }

    res.status(200).json("Un-Following the User");
  } catch (err) {
    return next(errorHandlerController(403, "Error in Following the user"));
  }
};
