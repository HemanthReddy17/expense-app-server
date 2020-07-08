const mongoose = require('mongoose');
const dotenv = require('dotenv')
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err, err.message);
    process.exit(1);
})


dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!')).catch((err) => {
        console.log("In server Check moongoose connect")
        // console.log(err)
    });


const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
}).on('error', (e) => console.log("object", e));;

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    // console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
