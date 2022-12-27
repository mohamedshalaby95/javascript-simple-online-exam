import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import path from "path";
// it is controll file for two end point rank and words

// we need read json file for get data
let dataFromJsonFile = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../assets/TestData.json"), "utf8")
);

// this is the types for words must at least one time appears at questions that send to client side
let arrayOfAllPosTypes = ["adverb", "verb", "noun", "adjective"];

//it is controller for send the questions to client side
export const getWordsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // we need to random the question  to send different question to client side and make sure the questions contain all type at least one time appear from arrayOfAllPosTypes
    const randomWordsList = getMultipleRandom(dataFromJsonFile.wordList, 10);
    res.status(200).json(randomWordsList);
  } catch (error) {
    res.status(500).send(error);
  }
};

//it is controller for get rank
export const postScoreController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get score from request body
  const score = req.body.score;
  try {
    if (!score) throw new Error("Score Must Be Provided");
    //we need to get all score at the list to can calculate the rank for the user
    const allNumberBiggerOrEqualToScore = dataFromJsonFile.scoresList.filter(
      (e) => e < score
    );
    // at this i calculate the rank for user  deponded on his score and score that existed at list
    const rank =
      (allNumberBiggerOrEqualToScore.length /
        dataFromJsonFile.scoresList.length) *
      100;
    res.status(200).json({ rank: rank });
  } catch (error) {
    res.status(500).send(error);
  }
};

// i make this function deponded on recursion and let try at most 10 times  to i didn't make sure at the future the list contain all types of arrayOfAllPosTypes and  send error if try more 10 to send questions
//this function make shuffle  to get numbers of questions  from list and call every time the function that check the questions contain all types that exist at arrayOfAllPosTypes
//if not contain try again  at most 10 times
let recursiveCounter = 10;
function getMultipleRandom(arr, num) {
  recursiveCounter--;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const shuffledArrayAllPos = shuffled.map((e) => e.pos);
  const isHavingAllPosTypes = checkIfAllPosAreInTheList(shuffledArrayAllPos);
  if (!isHavingAllPosTypes && recursiveCounter != 0)
    return getMultipleRandom(arr, num);
  return shuffled.slice(0, num);
}
//this function check the questions contain all types at arrayOfAllPosTypes or not
function checkIfAllPosAreInTheList(shuffledArrayAllPost: any[]) {
  return arrayOfAllPosTypes.every((e) => shuffledArrayAllPost.includes(e));
}
