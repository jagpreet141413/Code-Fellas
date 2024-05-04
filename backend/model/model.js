import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const ContactsModel = mongoose.model("contacts", ContactsSchema);

export default ContactsModel;
