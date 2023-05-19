import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/find/:id", getUserController);

router.put("/:id", updateUserController);

export default router;
