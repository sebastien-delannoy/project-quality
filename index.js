const express = require("express");
const mongoose = require("mongoose");
const routes = require("./router/movie_routes");

mongoose
  .connect("mongodb://localhost:27018/Movie_DB", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/", routes);

    app.listen(3003, () => {
      console.log("Server has started!");
    });
  });
