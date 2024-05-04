import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import nodemailer from "nodemailer";
import ContactsModel from "./model/model.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/contacts")
  .then(() => console.log("Database connected"))
  .catch(() => console.error("Database not connected"));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ilovepreet.freelancer@gmail.com', // Your email address
    pass: 'kkxqdwkdbauwzdqh' // Your password
  }
});

// Function to send email
const sendMail = async (name, email, message) => {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'ilovepreet.freelancer@gmail.com', // Sender address
      to: 'ilovepreet.freelancer@gmail.com', // Receiver address
      subject: 'New contact form submission', // Subject line
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>` // Email content
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
};

app.post('/contacts', (req, res) => {
  ContactsModel.create(req.body)
    .then((contact) => {
      console.log("Contact created:", contact);
      // Send email when contact is created
      sendMail(req.body.name, req.body.email, req.body.message);
      res.status(201).json(contact);
    })
    .catch((err) => {
      console.error("Error creating contact:", err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
