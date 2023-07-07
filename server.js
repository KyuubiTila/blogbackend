const express = require('express');
const postRouter = require('./route/post/postRoutes');
const userRouter = require('./route/user/userRoutes');
const commentsRouter = require('./route/comments/commentsRoutes');
const categoriesRouter = require('./route/categories/categoriesRoutes');
require('dotenv').config();
// postRouter
// userRouter
// dotenv.config();
require('./config/dbConnect');

const app = express();

console.log(app);

// middlewares;
// ----------

// ---------routes---------

// --------Users Route
app.use('/api/v1/users', userRouter);

// ----------Post Route
app.use('/api/v1/posts', postRouter);

// --------Comments Route
app.use('/api/v1/comments', commentsRouter);

// ---------Category Route
app.use('/api/v1/categories', categoriesRouter);

// error handlers midddlewares
// listen to servers
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server is up and runing on ${PORT}`));
