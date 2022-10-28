const express = require("express");
const mongoose = require("mongoose");
const movie = require("../model/movie");

const getMovies = async (req, res) => {
  const listMovies = await movie.find();
  res.send(listMovies);
};

const fetchMovie = (id) => {
  return movie.find();
};

const createMovie = async (req, res) => {
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
};

async function createFilm(
  title,
  rank,
  thumbnail,
  year,
  url,
  genre,
  synopsis,
  director,
  actors
) {
  try {
    const existingMovie = await movie.findOne({ title: title });

    if (existingMovie)
      throw new Error(`A movie with the same title ${title} already exists.`);

    const newMovie = new movie({
      title,
      rank,
      thumbnail,
      year,
      url,
      genre,
      synopsis,
      director,
      actors,
    });
    await newMovie.save();
    return newMovie;
  } catch (err) {
    throw err;
  }
}

const updateMovie = async (req, res) => {
  const { id } = req.params;
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Movie with id: ${id}`);
    }

    const updatedMovie = {
      title,
      rank,
      thumbnail,
      year,
      url,
      genre,
      synopsis,
      director,
      actors,
      _id: id,
    };

    await updatedMovie.findByIdAndUpdate(id, updateMovie, { new: true });

    res.status(200);
    res.json(updateMovie);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Movie with id: ${id}`);
    }

    await deleteMovie.findByIdAndDelete(id);
    res.status(200);
    res.json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

module.exports = {
  getMovies: getMovies,
  fetchMovie: fetchMovie,
  createMovie: createMovie,
  createFilm: createFilm,
  updateMovie: updateMovie,
};
