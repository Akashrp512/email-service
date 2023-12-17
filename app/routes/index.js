// app/routes/index.js
const express = require("express");
const router = express.Router();
const contactFormRoutes = require("./contactFormRoutes");

// Use contact form routes
router.use("/v1", contactFormRoutes);

module.exports = router;
