const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require('./controller/errorController');

const departmentRouter = require("./routes/departmentRoute");

const app = express();

//Using Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/departments", departmentRouter);

//For unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

module.exports = app;
