const express = require('express') // import express
const cors = require('cors') // import cors
const bodyParser = require('body-parser'); // import body parser 
const dotenv = require("dotenv");
const Sequelize = require('sequelize');
const OtherRouter = require('./src/');
const { postgraphile } = require('postgraphile'); // graphql schema and resolver generate automatically
const fileUpload = require('express-fileupload');

dotenv.config()

const app = express(); //app run in express
app.use(express.json({ limit: '250mb' }));
app.use(express.urlencoded({ limit: '250mb' }));

// parse application/json
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// user cors in server 
app.use(cors());

//get log of apis

app.use(fileUpload());

// graphql connection string 
let connectionstring = {}

connectionstring = {
  host: process.env.LOCAL_DB_HOST || process.env.POSTGRES_HOST,
  user: process.env.LOCAL_DB_USER_NAME || process.env.POSTGRES_USERNAME,
  password: process.env.LOCAL_DB_SECRET || process.env.POSTGRES_PASSWORD,
  database: process.env.LOCAL_DB || process.env.POSTGRES_DATABASE,
  port: process.env.LOCAL_DB_PORT || process.env.POSTGRES_PORT
}

console.log(JSON.stringify(connectionstring))
app.use(
    postgraphile(connectionstring, {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true
    })
);

// port initialize
const port = process.env.PORT || 1997;


//check default app runing 
app.get("/", (req, res) => {
    res.status(200).send({ message: "server running port is " + port });
});

//otherRouter
app.use('/api', OtherRouter)







app.listen(port, () => {
    console.log('running server port ' + port)
});