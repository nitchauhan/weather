const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    email: {
        type: String,
        requried: true,

    },
    name: {
        type: String,
        requried: true
    },
    phone: {
        type: Number,
        requried: true,
        unique: true
    },
    address: {
        type: String,
        requried: true,

    },
})


// now we need to create a collections

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = Contact;