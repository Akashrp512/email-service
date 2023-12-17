// routes/contactFormRoutes.js
const express = require("express");
const router = express.Router();
const { submitContactForm, getContactForms } = require("../../controllers/contactFormControllers");

router.post("/submit-contact-form", submitContactForm)
router.get('/contact-forms', getContactForms);

module.exports = router;
