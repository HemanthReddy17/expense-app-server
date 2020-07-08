const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');


const AppError = require('./src/utilities/appError');
const globalErrorHandler = require('./src/controllers/errorController');
const userRoute = require("./src/routes/users");
const transactionsRoute = require('./src/routes/transactions')
// Start express app
const app = express();


// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());



app.options('*', cors());


// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));


app.use("/api/v1/users", userRoute);
app.use("/api/v1/transactions", transactionsRoute);


app.get('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);



module.exports = app;