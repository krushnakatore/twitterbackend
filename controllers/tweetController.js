import tweetModel from "../models/tweetSchema.js";
import userModel from "../models/userSchema.js";
import { errorHandlerController } from "../error/errorHandler.js";
import fs from "fs";

export const createTweetController = async (req, res, next) => {
  try {
    const newTweet = new tweetModel(req.body);

    const savedTweet = await newTweet.save();

    res.status(200).send({
      success: true,
      message: "Tweet Created Successfully",
      savedTweet,
    });
  } catch (err) {
    console.log(err);
    res.status(502).send({
      success: false,
      message: "Error in Tweet Creation",
    });
  }
};

export const deleteTweetController = async (req, res) => {
  try {
    const tweet = await tweetModel.findById(req.params.id);

    if (tweet.userId === req.body.userId) {
      const tweet = await tweetModel.findByIdAndDelete(req.params.id);
      res.status(200).send({
        success: true,
        message: "Tweet Deleted Successfully",
        tweet,
      });
    } else {
      res.status(502).send({
        success: false,
        message: "You can delete only your tweets",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(502).send({
      success: false,
      message: "Error in Tweet Deletion",
    });
  }
};

export const likeDislikeTweetController = async (req, res) => {
  try {
    const tweet = await tweetModel.findById(req.params.id);

    if (!tweet.likes.includes(req.body.userId)) {
      await tweet.updateOne({ $push: { likes: req.body.userId } });
      res
        .status(200)
        .send({ success: true, message: "Tweet liked Successfully", tweet });
    } else {
      await tweet.updateOne({ $pull: { likes: req.body.userId } });
      res
        .status(200)
        .send({ success: true, message: "Tweet disliked Successfully", tweet });
    }
  } catch (err) {
    console.log(err);
    res.status(502).send({
      success: false,
      message: "Error in Tweet Liked And Dislike",
    });
  }
};

export const getAllTweetsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    const userTweets = await tweetModel.find({ userId: user._id });

    const followersTweets = await Promise.all(
      user.following.map((followId) => {
        return tweetModel.find({ userId: followId });
      })
    );

    res.status(200).json(userTweets.concat(...followersTweets));
  } catch (err) {
    console.log(err);
    res.status(502).send({
      success: false,
      message: "Error in Tweet Extraction",
    });
  }
};

export const getUserTweetsController = async (req, res) => {
  try {
    const userTweets = await tweetModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    res.status(200).send(userTweets);
  } catch (err) {
    console.log(err);
    res.status(502).send({
      success: false,
      message: "Error in Tweet Extraction",
    });
  }
};

export const exploreAllTweetsController = async (req, res) => {
  try {
    const exploreTweets = await tweetModel
      .find({ likes: { $exists: true } })
      .sort({ likes: -1 });

    res.status(200).json(exploreTweets);
  } catch (err) {
    console.log(err);
    res.status(502).send({
      success: false,
      message: "Error in Tweet Extraction",
    });
  }
};
