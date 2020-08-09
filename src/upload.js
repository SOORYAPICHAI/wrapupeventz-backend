// const models = require('../models');
// var uuid4 = require('uuid4');
// const fs = require("fs");
const aws = require("aws-sdk");
var uuid4 = require("uuid4");

module.exports = (req, res) => {
  console.log(req.files);
  console.log(Object.keys(req.files));
  console.log(Object.keys(req.files).length);
  // console.log(req.files['file-upload']);

  const s3 = new aws.S3({
    accessKeyId: "AKIAI7MYN3TPYFLJC2IA",
    secretAccessKey: "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",
    Bucket: "wrapupeventzimages",
  });
  const idUUID = uuid4();
  const uploadProfile = async () => {
    // Setting up S3 upload parameters
    const params = {
      Bucket: "wrapupeventzimages",
      Key: `profile-images/profile-${uuid4()}.${
        req.files["file-upload"].name.split(".")[1]
      }`, // File name you want to save as in S3
      Body: req.files["file-upload"].data,
      ACL: "public-read",
      ContentType: req.files["file-upload"].mimetype,
    };
    var putObjectPromise = s3.upload(params).promise();
    putObjectPromise
      .then(async (data) => {
        console.log("success");
        console.log(data);
        res.status(200).send({ message: "uploaded successfully", data: data });
      })
      .catch((err) => {
        console.log("error in callback");
        console.log(err);
        res.status(500).send({ message: "Image not uploaded" });
      });
  };


  const subMapFunc = async(val) =>{
    return await new Promise(async (resolve, reject) => {
      console.log("here@@");
      let _keys = Object.keys(req.files);
      let calls =  await req.files[val].map(async (subVal) => {
          console.log(subVal);
          var params = {
            Bucket: "wrapupeventzimages",
            Key: `profile-images/profile-${uuid4()}.${
              subVal.name.split(".")[1]
            }`, // File name you want to save as in S3
            Body: subVal.data,
            ACL: "public-read",
            ContentType: subVal.mimetype,
          };

          var putObjectPromise = s3.upload(params).promise();
          

          return await putObjectPromise
            .then((data) => {
              // console.log("success");
              // console.log(data);
              // res.status(200).send({ message: "uploaded successfully", data: data });
              return data;
            })
            .catch((err) => {
              console.log("error in callback");
              console.log(err);
              res.status(500).send({ message: "Image not uploaded" });
              reject(false);
            });
        });
      
      await Promise.all(calls)
        .then((data) => {
          let _obj ={}
          _obj[val] = data 
          resolve(_obj);
        })
        .catch((err) => {
          console.log(err);
          reject(false);
        });
    });
  }
  const uploadMultipleImages = async () => {
    // Setting up S3 upload parameters

    return new Promise(async (resolve, reject) => {
      console.log("here@@");
      let _keys = Object.keys(req.files);
      let calls =  _keys.map(async (val) => {
         return await subMapFunc(val)
        //  console.log(a,"aaaaaaaaaaaaaaaaaaaaaaaa")
      });
      await Promise.all(calls)
        .then((data) => {
          console.log(data);
          res
            .status(200)
            .send({ message: "uploaded successfully", data: data });
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(false);
        });
    });
  };
  // Uploading files to the bucket
  // s3.createBucket(async function () {

  // });

  try {
    const profileUpload = async () => await uploadMultipleImages();
    profileUpload();
  } catch (error) {}
};
