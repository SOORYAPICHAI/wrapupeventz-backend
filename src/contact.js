const fs = require("fs");
module.exports = {
    

  add: (req, res) => {
    const { email, mobile, name, message } = req.body;
    try {
      fs.readFile(
        "contactdata.json",
        "utf8",
        function readFileCallback(err, data) {
          if (err) {
            console.log(err);
          } else {
            obj = JSON.parse(data); //now it an object
            obj.data.push({ date: new Date(), name, email, mobile, message }); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile("contactdata.json", json, "utf8", () => {
              res
                .status(200)
                .send({ message: "Contact added successfully", status: 200 });
            }); // write it back
          }
        }
      );
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send({ message: "internal server error", status: 500, error: e });
    }
  },
  view: (req, res) => {
    try {
      fs.readFile(
        "contactdata.json",
        "utf8",
        function readFileCallback(err, data) {
          if (err) {
            console.log(err);
          } else {
            obj = JSON.parse(data); //now it an object
            
            json = JSON.stringify(obj); //convert it back to json
            res
              .status(200)
              .send({
                message: "Data fetched successfully",
                status: 200,
                data: json,
              });
          }
        }
      );
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .send({ message: "internal server error", status: 500, error: e });
    }
  },
};
