const express = require('express');
const OtherRouter = express.Router();

const { upload } = require("./multer");

// Load dependencies
// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');


// aws.config.update({
//       accessKeyId:'TR6SKCFW4GC5SZ2W76FU',
//       secretAccessKey:'IOKcO6mC7dkqE/n44RVqch+fyMJbFnX2omQII0mslYk'
//     });

    // Set S3 endpoint to DigitalOcean Spaces
// Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint
// });
//     // Change bucket property to your Space name
//     const upload = multer({
//       storage: multerS3({
//         s3: s3,
//         bucket: 'wrapupeventzimages',
//         acl: 'public-read',
//         key: function (request, file, cb) {
//             console.log('file=============');
//             console.log(file);
//             console.log('file=============');
//           cb(null, file);
//         }
//       })
//     })
    

const CreateQuestionsAndCategory = require('./create-questions-answers');
const Creatcategories = require('./create-category');

const FetchQuestions = require('./fetch-questions');

const FetchAnswers = require('./fetch-answers');

const PostAnswers = require('./post-answers');

const CreateProfiles = require('./create_profile');
// const ProfileImageUpload = require('./upload');

const ProfileImageUpload = require('./upload');


OtherRouter.post('/createquestionsanswers', CreateQuestionsAndCategory)
OtherRouter.post('/createcategories', Creatcategories)

OtherRouter.post('/fetchquestions', FetchQuestions) 

OtherRouter.post('/fetchanswers', FetchAnswers)

OtherRouter.post('/postanswers', PostAnswers)

OtherRouter.post('/updateprofile', CreateProfiles)

OtherRouter.post('/upload',upload, ProfileImageUpload)

// OtherRouter.post('/updateprofileimage', ProfileImageUpload)

module.exports = OtherRouter;