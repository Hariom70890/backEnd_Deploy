const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/users.routes");
const { postRouter } = require("./Routes/posts.routes");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use("/posts", postRouter);

// app.listen(process.env.port, async () => {
//    try {
//       await connection;
//       console.log(`Server is running at port ${process.env.port}`);
//       console.log("Connected to db");
//    } catch (error) {
//       console.log(error.message);
//       console.log("something went wrong!!");
//    }
// });

module.exports = { app };
