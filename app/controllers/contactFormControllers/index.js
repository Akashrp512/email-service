// controllers/ContactFormController/index.js
const db = require("../../models");
const emailService = require("../../service/emailService")
const submitContactForm = async (req, res) => {
    try {
        const { name, email, phoneNumber, message } = req.body;
        // Store form data in the database
        const contactForm = await db.ContactForm.create({
            name,
            email,
            phoneNumber,
            message,
        });

        // Send a thank-you email to the user
        await emailService.sendThankYouEmail(email);

       // Send notification email to the owner
       await emailService.sendOwnerNotificationEmail('akashrp512@gmail.com', {
        name,
        email,
        phoneNumber,
        message,
    });


        // ... (rest of the code remains the same)
        console.log(contactForm, "contactForm")
        res.status(200).json({ message: "Form submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getContactForms = async (req, res) => {
    try {
        const contactForms = await db.ContactForm.findAll();
        res.status(200).json(contactForms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    submitContactForm,
    getContactForms
};