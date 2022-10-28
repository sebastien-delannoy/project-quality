const express = require("express");
const movie = require("../model/movie");
const controller = require("../controller/movie_controller");
const createMovie = require("../controller/createMovie.js");
const router = express.Router();

router.get("/movies", controller.getMovies);


router.post("/movies", async (req, res) => {
  const {
    title,
    rank,
    thumbnail,
    year,
    url,
    genre,
    synopsis,
    director,
    actors,
  } = req.body;
  try {
    const { movieId } = await createMovie(
      title,
      rank,
      thumbnail,
      year,
      url,
      genre,
      synopsis,
      director,
      actors
    );
    res.json({ movieId });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/update_movies", async (req, res) => {
  const {
    title,
    rank,
    thumbnail,
    year,
    url,
    genre,
    synopsis,
    director,
    actors,
  } = req.body;
  try {
    const { movieId } = await updatedMovie(
      title,
      rank,
      thumbnail,
      year,
      url,
      genre,
      synopsis,
      director,
      actors
    );
    res.json({ movieId });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/delete_movies", async (req, res) => {
  const {
    title,
    rank,
    thumbnail,
    year,
    url,
    genre,
    synopsis,
    director,
    actors,
  } = req.body;
  try {
    const { movieId } = await deleteMovie(
      title,
      rank,
      thumbnail,
      year,
      url,
      genre,
      synopsis,
      director,
      actors
    );
    res.json({ movieId });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});


module.exports = router;
