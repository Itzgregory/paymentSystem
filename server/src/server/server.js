const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const { variables: { MONGO_URL } } = require('../../config');
const { logerror } = require("../helpers/logger");
const  { errorHandler, notFound } = require('../middlewares/errorhandler/errorHandler')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(cookieParser());

const routerConfig = require('../routes/index');
app.use(routerConfig());


app.use(errorHandler);
module.exports = { app }; 