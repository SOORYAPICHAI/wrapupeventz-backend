const express = require('express');
const OtherRouter = express.Router();

const CreateQuestionsAndCategory = require('./create-questions-answers');

// const FetchQuestions = require('./fetch-questions');

// const FetchAnswers = require('./fetch-answers');

// const PostAnswers = require('./post-answers');


// const ProfileImageUpload = require('./upload');



OtherRouter.post('/createquestionsanswers', CreateQuestionsAndCategory)

// OtherRouter.post('/fetchquestions', FetchQuestions) 

// OtherRouter.post('/fetchanswers', FetchAnswers)

// OtherRouter.post('/postanswers', PostAnswers)

// OtherRouter.post('/updateprofileimage', ProfileImageUpload)

module.exports = OtherRouter;