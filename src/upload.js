const models = require("../models");
// var uuid4 = require('uuid4');
// const fs = require("fs");
const aws = require("aws-sdk");
var uuid4 = require("uuid4");

module.exports = (req, res) => {
  const created_at = new Date(),
    updated_at = new Date();
  const { answers } = models;

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    Bucket: "wrapupeventzimages",
  });
  const idUUID = uuid4();
  const uploadProfile = async () => {
    // Setting up S3 upload parameters
    const params = {
      Bucket: "wrapupeventzimages",
      Key: `profile-images/profile-${uuid4()}.${
        req.files["profile-upload"].name.split(".")[1]
      }`, // File name you want to save as in S3
      Body: req.files["profile-upload"].data,
      ACL: "public-read",
      ContentType: req.files["profile-upload"].mimetype,
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

  const subMapFunc = async (val) => {
    return new Promise(async (resolve, reject) => {
      // console.log('-------------');
      // console.log(req.files[val].constructor === Array ? req.files[val] :[req.files[val]])
      // console.log('-------------');
      let _keys = Object.keys(req.files);
      let _mapper =
        req.files[val].constructor === Array
          ? req.files[val]
          : [req.files[val]];
      let calls = await _mapper.map(async (subVal, i) => {
        console.log("subVal", subVal);
        var params = {
          Bucket: "wrapupeventzimages",
          Key: `answers/profile_${req.body.profile_id[0]}/question_${val}-${
            subVal.name.split(".")[0]
          }.${subVal.name.split(".")[1]}`, // File name you want to save as in S3
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
          let _obj = {};
          _obj[val] = data;
          resolve(_obj);
        })
        .catch((err) => {
          console.log(err);
          reject(false);
        });
    });
  };
  const uploadMultipleImages = async () => {
    // Setting up S3 upload parameters
    res.status(200).send({ message: "data saved successfully" });
    return new Promise(async (resolve, reject) => {
      console.log("here@@");
      let _keys = Object.keys(req.files);
      let calls = _keys.map(async (val) => {
        return await subMapFunc(val);
        //  console.log(a,"aaaaaaaaaaaaaaaaaaaaaaaa")
      });
      await Promise.all(calls)
        .then((data) => {
          let _answers_array = JSON.parse(req.body.answers).answers;

          let _profile_id = JSON.parse(req.body.answers).profile_id;
          console.log(data);
          data.map((val) => {
            var _obj = {};
            var keys = Object.keys(val)[0];
            var values = Object.values(val)[0].map((val) => {
              return val.Location;
            });
            _obj["id"] = keys;
            _obj["answer"] = values.toString();
            _answers_array.push(_obj);
          });

          // res
          //   .status(200)
          //   .send({ message: "uploaded successfully", data: data });
          _uploadQuestions(_answers_array, _profile_id)
            .then((val) => {
              res
                .status(200)
                .send({ message: "data saved successfully", data: val });
            })
            .catch(() => {});
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

  //  SAVE QUESTIONS

  const _uploadQuestions = async (data, _profile_id) => {
    return new Promise(async (resolve, reject) => {
      let calls = data.map(async (val) => {
        console.log("---------------", val);
        let idUUID = uuid4();
        const __answers = {
          question_id: val.id,
          answer: val.answer,
          _id: idUUID,
          profile_id: _profile_id,
          createdAt: created_at,
          updatedAt: updated_at,
        };
        return await answers.create(__answers);
      });
      await Promise.all(calls)
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(false);
        });
    });
  };

  try {
    const profileUpload = async () => {
      let _keys = Object.keys(req.files);
      console.log(_keys, "_keys_keys_keys");
      if (_keys[0] === "profile-upload") {
        uploadProfile();
      } else {
        console.log("<><><><><><><>M<>");
        await uploadMultipleImages();
        console.clear();
        // console.log(_answers,"_answers_answers_answers_answers");
      }
    };
    profileUpload();
  } catch (error) {}
};
