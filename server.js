const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server Started on ${port}....`);
});

//Unhandled Rejections
process.on("unhandledrejection", (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection SHUTDOWN!SHUTDOWN!SHUTDOWN!')
  server.close(() => {
    process.exit(1);
  });
});
