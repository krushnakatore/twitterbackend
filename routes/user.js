import express from "express";
import {
  deleteUserController,
  followController,
  getUserController,
  unFollowController,
  updateUserController,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/find/:id", getUserController);

router.put("/update/:id", verifyUser, updateUserController);

router.delete("/delete/:id", verifyUser, deleteUserController);

router.put("/follow/:id", verifyUser, followController);

router.put("/unfollow/:id", verifyUser, unFollowController);

export default router;
