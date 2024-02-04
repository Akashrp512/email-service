const db = require("../models");
const emailService = require("../service/emailService")

const sendEmailsInBackground = async (toEmail, formData) => {
    try {
        // Send a thank-you email to the user
        // await emailService.sendThankYouEmail(toEmail);

        // Send notification email to the owner
        await emailService.sendOwnerNotificationEmail([ 'akashrp512@gmail.com','avinashrp2@gmail.com'], formData);
        // 'avi@digielevation.com', 'avinashrp2@gmail.com'
    } catch (error) {
        console.error('Error sending emails:', error);
        // Handle any error in the background email sending process
    }
};

const submitContactForm = async (req, res) => {
    try {
        const { name, email, phoneNumber, message } = req.body;
        // Store form data in the database
        await db.ContactForm.create({
            name,
            email,
            phoneNumber,
            message,
        });

        res.status(200).json({ message: "Thank You for Contacting Us, We will get back to you soon..." });
        // Send emails in the background
        sendEmailsInBackground(email, {
            name,
            email,
            phoneNumber,
            message,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Please try Again" });
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