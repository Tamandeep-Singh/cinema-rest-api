const express = require('express');
const db = require('./src/config/db_connection.js');
const app = express();
const movieRoute = require('./src/routes/movie.js');
require('dotenv').config();

db.connectToDB((error) => {
    if(error) {
        console.error(`[MongoDB]: Error connecting to database. Error: ${error}`);
    };
});

app.use((request, response, next) => {
    console.log(request.url);
    next();
});

app.use(express.json());
app.use("/movies", movieRoute);

app.listen(process.env.PORT || 8081, () => console.log(`Server started.`));