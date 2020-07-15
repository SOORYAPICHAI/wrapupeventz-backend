const express = require('express');
const OtherRouter = express.Router();

const CreateQuestionsAndCategory = require('./create-questions-answers');
const Creatcategories = require('./create-category');

const FetchQuestions = require('./fetch-questions');

const FetchAnswers = require('./fetch-answers');

const PostAnswers = require('./post-answers');

const CreateProfiles = require('./create_profile');
// const ProfileImageUpload = require('./upload');



OtherRouter.post('/createquestionsanswers', CreateQuestionsAndCategory)
OtherRouter.post('/createcategories', Creatcategories)

OtherRouter.post('/fetchquestions', FetchQuestions) 

OtherRouter.post('/fetchanswers', FetchAnswers)

OtherRouter.post('/postanswers', PostAnswers)

OtherRouter.post('/updateprofile', CreateProfiles)

// OtherRouter.post('/updateprofileimage', ProfileImageUpload)

module.exports = OtherRouter;