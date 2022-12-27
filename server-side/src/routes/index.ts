import express from 'express';
import {postScoreController,getWordsController} from '../controls'

const route = express.Router();

// we have two end point rank and words to route for it and pass it each controll method  for it

route.get('/words',getWordsController);

route.post('/rank',postScoreController);

export default route;