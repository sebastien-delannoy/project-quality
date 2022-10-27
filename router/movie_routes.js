const express = require("express");
const movie = require("../model/movie");
const router = express.Router();

router.get("/movies", async (req, res) => {
  const listMovies = await movie.find();
  res.send(listMovies);
});

router.post("/movies", async (req, res) => {
  const newMovie = new movie({
    title: req.body.title,
    rank: req.body.rank,
    id: req.body.id,
    thumbnail: req.body.thumbnail,
    url: req.body.url,
    genre: req.body.genre,
    year: req.body.year,
    synopsis: req.body.synopsis,
    director: req.body.director,
    actors: req.body.actors,
  });
  await newMovie.save();
  res.send(newMovie);
});

module.exports = router;
