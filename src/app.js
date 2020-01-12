var express = require('express');
var bodyParser = require('body-parser');

var errorLogger=require("./utilities/errorLogger")
var requestLogger=require("./utilities/requestLogger")

var routes=require("./routes/router")

var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger)
app.use("/",routes)
app.use(errorLogger)

app.listen(5000)
console.log("Server is listening at 5000")