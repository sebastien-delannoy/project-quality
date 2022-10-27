const express = require("express");
const Movie = require("./models/Movie");
const router = express.Router();

router.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post("/movies", async (req, res) => {
  const movie = new Movie({
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
  await movie.save();
  res.send(movie);
});

module.exports = router;
