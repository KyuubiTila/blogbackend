const express = require('express');
require('dotenv').config();
// dotenv.config();
require('./config/dbConnect');

const app = express();

console.log(app);

// middlewares;
// routes;
// error handlers midddlewares
// listen to servers
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server is up and runing on ${PORT}`));
