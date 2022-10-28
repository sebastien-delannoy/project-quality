const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./router/movie_routes");

mongoose
  .connect("mongodb://localhost:27018/Movie_DB", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/", movieRoutes);

    app.listen(3003, () => {
      console.log("Server has started!");
    });
  });
