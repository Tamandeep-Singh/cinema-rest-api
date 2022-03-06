const Movie = require('../models/movie_model.js');
const responseHelper = require('../helpers/response_helper.js');

async function createMovie(movieObject) {
   await Movie.create({
      name: movieObject.name,
      rating: movieObject.rating,
      description: movieObject.description,
      releaseDate: movieObject.releaseDate,
      runningTime: movieObject.runningTime,
      director: movieObject.director,
      cast: movieObject.cast,
      posterLink: movieObject.posterLink,
      trailerLinks: movieObject.trailerLinks
    }, 
    (error, movie) => {
       if(!error) {
          return movie;
       }
    });
};


exports.getMovies = async function(request, response) {
   const data = await Movie.find().select({__v: 0});
   return response.status(200).json(responseHelper.getResponse({controller: "movie_controller", func: "getMovies"}, 200, data));
};

exports.addMovie = async function(request, response) {
   if(request.body.movies && !(request.body.movies.length === 0)) {
      let addedAll = true;
      request.body.movies.forEach((movieObject) => {
         let movie = createMovie(movieObject);
         if(!movie) {
            addedAll = false;
         };
      });
      if(!addedAll) {
         return response.status(400).json(responseHelper.getResponse(
            {controller: "movie_controller", func: "addMovie"},
            400,
            {error:"Could not add movies from movies object."}
         ));
      }
      else {
         return response.status(200).json(responseHelper.getResponse(
            {controller: "movie_controller", func: "addMovie"},
            200,
            {movies:request.body.movies}
         ));
      }
   }
   else {
      if(request.body.movies) {
         return response.status(400).json(responseHelper.getResponse(
            {controller: "movie_controller", func: "addMovie"},
            400,
            {error:"Could not add movie since movies array is empty."}
         ));
      };
      let movie = createMovie(request.body);
      if(!movie) {
         return response.status(400).json(responseHelper.getResponse(
            {controller: "movie_controller", func: "addMovie"},
            400,
            {error:"Could not add movie."}
         ));
      }
      else {
         return response.status(200).json(responseHelper.getResponse(
            {controller: "movie_controller", func: "addMovie"},
            200,
            {movie:request.body}
         ));
      };
   }
  
};