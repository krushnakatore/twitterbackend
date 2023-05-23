import express from "express";
import {
  createTweetController,
  deleteTweetController,
  likeDislikeTweetController,
  getAllTweetsController,
  getUserTweetsController,
  exploreAllTweetsController,
  updateTweetController,
} from "../controllers/tweetController.js";
import { verifyUser } from "../middlewares/checkToken.js";

const router = express.Router();

//create Tweet
router.post("/create", verifyUser, createTweetController);

//update Tweet
router.put("/update/:id", verifyUser, updateTweetController);

//delete Tweet
router.delete("/delete/:id/:userId", verifyUser, deleteTweetController);

//like or dislike
router.put("/like/:id", likeDislikeTweetController);

//all tweets
router.get("/timeline/:id", getAllTweetsController);

//get users tweets only
router.get("/user/all/:id", getUserTweetsController);

//explore all tweets
router.get("/explore", exploreAllTweetsController);

export default router;
