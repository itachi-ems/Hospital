const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require('./controller/errorController');

const departmentRouter = require("./routes/departmentRoute");
const userRouter = require('./routes/userRoutes');

const app = express();

//Using Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
})

app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/users",userRouter);

//For unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

module.exports = app;
