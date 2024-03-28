const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const url =process.env.mongoURL;
const connect = require("./DB/connect");
app.use(express.json());
app.use(cors());
const {
  getAll,
  patchTaskById,
  deleteTaskById,
  getTaskById,
  newPost,
} = require("./controllers/functions");
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/v1/tasks", getAll);
app.post("/api/v1/tasks/", newPost);
app.get("/api/v1/tasks/:id", getTaskById);
app.put("/api/v1/tasks/:id", patchTaskById);
app.delete("/api/v1/tasks/:id", deleteTaskById);
const start = async () => {
  await connect(url)
    .then(() => {
      console.log("connected successfully to the cloud database");
      app.listen(port, () => console.log(`http://localhost:${port}`));
    })
    .catch((err) => {
      console.log(err);
    });
};
start();
