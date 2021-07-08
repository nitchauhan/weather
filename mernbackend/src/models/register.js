const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
const employeeSchema = new mongoose.Schema({
    fname: {
        type: String,
        requried: true
    },
    lname: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    phone: {
        type: Number,
        requried: true,
        unique: true
    },
    pass1: {
        type: Number,
        requried: true
    },
    pass2: {
        type: Number,
        requried: true
    },
    tokens: [{
        type: String,
        requried: true
    }]
})


// genrate token

employeeSchema.methods.generateAuthToken = async function(req, res) {
        try {
            // console.log(this._id);
            const tomken = jwt.sign({ _id: this._id.toString() }, "mynameisnitinchauhaniamfreshers");
            this.tokens = this.tokens.concat({ tomken: tomken })
            await this.save();
            return token;

        } catch (error) {
            res.send(`the error part is ${error}`);
            console.log(`the error part is ${error}`);

        }
    }
    // now we need to create a collections

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;