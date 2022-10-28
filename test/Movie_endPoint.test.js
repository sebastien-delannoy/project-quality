const MovieModel = require("../model/movie");
const mockingoose = require("mockingoose");
const ctrl = require("../controller/movie_controller");
const fetch = require("node-fetch");
const express = require("express");
const createMovie = require("../controller/createMovie.js");
const router = express.Router();

it("this test checks reading a movie in the DB", async () => {
  mockingoose(MovieModel).toReturn(
    [
      {
        title: "La vie est belle",
        rank: "7",
        thumbnail: "",
        year: "2000",
        url: "",
        genre: "",
        synopsis: "",
        director: "",
        actors: "",
      },
    ],
    "find"
  );
  const results = await ctrl.fetchMovie(1);
  expect(results[0].title).toBe("La vie est belle");
});

it("should create a movie", async () => {
  mockingoose(MovieModel).toReturn(
    [
      {
        title: "Le silence des agneaux",
        rank: "8",
        thumbnail: "",
        year: "1998",
        url: "",
        genre: "Thriller",
        synopsis: "Ca fait peur",
        director: "",
        actors: "",
      },
    ],
    "save"
  );
  const results = await ctrl.createFilm(
    "Le silence des agneaux",
    "8",
    "",
    "1998",
    "",
    "Thriller",
    "Ca fait peur",
    "",
    ""
  );
  console.log(results);
  expect(results).toMatchObject({
    title: "Le silence des agneaux",
    rank: "8",
    thumbnail: "",
    year: "1998",
    url: "",
    genre: "Thriller",
    synopsis: "Ca fait peur",
    director: "",
    actors: "",
  });
});

it("this  test fetchs through a list of response", async () => {
  let res = await fetch("http://127.0.0.1:3003/movies");
  let films = await res.json();

  expect(films).toEqual([
    {
      __v: 0,
      _id: "635b8be845a8966bfa739278",
      actors: "",
      director: "Stanley Kubrick",
      genre: "Comedy",
      rank: "2",
      synopsis: "soon",
      thumbnail: "",
      title: "Game of Thrones",
      url: "",
      year: "1998",
    },
    {
      _id: "635ba861528414d6f0d900bf",
      actors: "Tim Robbins, Morgan Freeman",
      director: "Frank Darabont",
      genre: "Drama",
      id: "tt0111161",
      rank: "1",
      synopsis:
        "Andy Dufresne is sent to Shawshank Prison for the murder of his wife and her secret lover. He is very isolated and lonely at first, but realizes there is something deep inside your body that people can't touch or get to....'HOPE'. Andy becomes friends with prison 'fixer' Red, and Andy epitomizes why it is crucial to have dreams. His spirit and determination lead us into a world full of imagination, one filled with courage and desire. Will Andy ever realize his dreams?",
      thumbnail: "",
      title: "The Shawshank Redemption",
      url: "",
      year: "1994",
    },
  ]);
});

it("this integration test checks the overall consistency between fetched and saved Movie records", async () => {
  let res = await fetch("http://127.0.0.1:3003/movies");
  let films = await res.json();

  expect(films).toEqual([
    {
      __v: 0,
      _id: "635b8be845a8966bfa739278",
      actors: "",
      director: "Stanley Kubrick",
      genre: "Comedy",
      rank: "2",
      synopsis: "soon",
      thumbnail: "",
      title: "Game of Thrones",
      url: "",
      year: "1998",
    },
    {
      _id: "635ba861528414d6f0d900bf",
      actors: "Tim Robbins, Morgan Freeman",
      director: "Frank Darabont",
      genre: "Drama",
      id: "tt0111161",
      rank: "1",
      synopsis:
        "Andy Dufresne is sent to Shawshank Prison for the murder of his wife and her secret lover. He is very isolated and lonely at first, but realizes there is something deep inside your body that people can't touch or get to....'HOPE'. Andy becomes friends with prison 'fixer' Red, and Andy epitomizes why it is crucial to have dreams. His spirit and determination lead us into a world full of imagination, one filled with courage and desire. Will Andy ever realize his dreams?",
      thumbnail: "",
      title: "The Shawshank Redemption",
      url: "",
      year: "1994",
    },
  ]);

  const results = await ctrl.createFilm(
    "Le silence des agneaux",
    "8",
    "",
    "1998",
    "",
    "Thriller",
    "Ca fait peur",
    "",
    ""
  );

  expect(results).toMatchObject({
    title: "Le silence des agneaux",
    rank: "8",
    thumbnail: "",
    year: "1998",
    url: "",
    genre: "Thriller",
    synopsis: "Ca fait peur",
    director: "",
    actors: "",
  });

  let updatedResult = await fetch("http://127.0.0.1:3003/movies");
  let updatedFilm = await updatedResult.json();

  console.log(updatedFilm);
  expect(updatedFilm).toEqual([
    {
      __v: 0,
      _id: "635b8be845a8966bfa739278",
      actors: "",
      director: "Stanley Kubrick",
      genre: "Comedy",
      rank: "2",
      synopsis: "soon",
      thumbnail: "",
      title: "Game of Thrones",
      url: "",
      year: "1998",
    },
    {
      _id: "635ba861528414d6f0d900bf",
      actors: "Tim Robbins, Morgan Freeman",
      director: "Frank Darabont",
      genre: "Drama",
      id: "tt0111161",
      rank: "1",
      synopsis:
        "Andy Dufresne is sent to Shawshank Prison for the murder of his wife and her secret lover. He is very isolated and lonely at first, but realizes there is something deep inside your body that people can't touch or get to....'HOPE'. Andy becomes friends with prison 'fixer' Red, and Andy epitomizes why it is crucial to have dreams. His spirit and determination lead us into a world full of imagination, one filled with courage and desire. Will Andy ever realize his dreams?",
      thumbnail: "",
      title: "The Shawshank Redemption",
      url: "",
      year: "1994",
    },
  ]);
});
