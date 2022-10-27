const express = require("express");
const mongoose = require("mongoose");

const getMovies = async (req, res) => {
    const listMovies = await movie.find();
    res.send(listMovies);
  });

module.exports = {
  getMovies:getMovies
};
