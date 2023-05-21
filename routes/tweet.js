import express from "express";
import {
  createTweetController,
  deleteTweetController,
  likeDislikeTweetController,
  getAllTweetsController,
  getUserTweetsController,
  exploreAllTweetsController,
} from "../controllers/tweetController.js";
import { verifyUser } from "../middlewares/checkToken.js";

const router = express.Router();

//create Tweet
router.post("/create", verifyUser, createTweetController);

//delete Tweet
router.delete("/delete/:id", verifyUser, deleteTweetController);

//like or dislike
router.put("/like/:id", verifyUser, likeDislikeTweetController);

//all tweets
router.get("/timeline/:id", verifyUser, getAllTweetsController);

//get users tweets only
router.get("/user/:id", verifyUser, getUserTweetsController);

//explore all tweets
router.get("/explore", exploreAllTweetsController);

export default router;
