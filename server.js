const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const routes = require("./app/routes")
const app = express();
const dotenv = require('dotenv').config();  // Add this line

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//db connection
db.sequelize.sync()
    .then(() => {
        console.log("Synced Database.");

    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// Use all routes
app.use("/api", routes);


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Email Service application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});