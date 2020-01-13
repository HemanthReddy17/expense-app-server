var express = require('express');
var bodyParser = require('body-parser');

var errorLogger = require("./utilities/errorLogger")
var requestLogger = require("./utilities/requestLogger")

//routes
var dbsetup = require("./routes/dbsetup")
var income = require("./routes/income")
var expense = require("./routes/expense")
var user = require("./routes/users")


var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(requestLogger)
app.use("/dbsetup", dbsetup)
app.use("/users", user)
app.use("/income", income)
app.use("/expense", expense)
app.use(errorLogger)


app.listen(5000)
console.log("Server is listening at 5000")