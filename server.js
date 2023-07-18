const express = require('express');
const postRouter = require('./route/post/postRoutes.js');
const userRouter = require('./route/user/userRoutes.js');
const commentsRouter = require('./route/comments/commentsRoutes.js');
const categoriesRouter = require('./route/categories/categoriesRoutes.js');
const globalErrorHandler = require('./middlewares/globalErrorHandler.js');
require('dotenv').config();
// postRouter
// userRouter
// dotenv.config();
require('./config/dbConnect');

const app = express();

console.log(app);

// middlewares;
// ----------
app.use(express.json());

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
app.use(globalErrorHandler);

// 404 Error
app.use('*', (req, res) => {
  console.log(req.originalUrl);
  res.status(404).json({
    message: `${req.originalUrl} -  route not found`,
  });
});

// listen to servers
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server is up and runing on ${PORT}`));
