import userModel from "../models/userSchema.js";

export const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log("Error getting user", err);
  }
};

export const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log("Error getting user", err);
  }
};
