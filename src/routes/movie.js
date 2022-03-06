const router = require('express').Router();
const movieController = require('../controllers/movie_controller.js');

router.get('/all', movieController.getMovies);
router.post('/add', movieController.addMovie);

module.exports = router;