const movie = require("../model/movie");

module.exports = async function createFilm(
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
    return {
      movieId: newMovie._id,
    };
  } catch (err) {
    throw err;
  }
};
