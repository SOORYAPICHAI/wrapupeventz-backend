const dotenv = require('dotenv');
dotenv.config();

module.exports={
  local:{
    username:process.env.LOCAL_DB_USER_NAME || process.env.POSTGRES_USERNAME,
    password:process.env.LOCAL_DB_SECRET || process.env.POSTGRES_PASSWORD,
    database:process.env.LOCAL_DB || process.env.POSTGRES_DATABASE,
    host:process.env.LOCAL_DB_HOST || process.env.POSTGRES_HOST,
    logging:false,
    dialect: "postgres"
  },
  staging: {
    username : process.env.STAGE_DB_USER_NAME || process.env.POSTGRES_USERNAME,
    password : process.env.STAGE_DB_SECRET || process.env.POSTGRES_PASSWORD,
    database :  process.env.STAGE_DB || process.env.POSTGRES_DATABASE,
    host : process.env.STAGE_DB_HOST || process.env.POSTGRES_HOST,
    logging: false,
    dialect: "postgres"
  },
  production: {
    username : process.env.PROD_DB_USER_NAME || process.env.POSTGRES_USERNAME,
    password : process.env.PROD_DB_SECRET || process.env.POSTGRES_PASSWORD,
    database :  process.env.PROD_DB || process.env.POSTGRES_DATABASE,
    host : process.env.PROD_DB_HOST || process.env.POSTGRES_HOST,
    logging:false,
    dialect: "postgres"
  }
}

