const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs')
var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient;
var assert = require('assert');
var util = require('util');
const path = require('path')
const app = express()
var db;
const Register = require("./models/register");
const Contact = require("./models/Contact");
const Login = require("./models/Login");

require("./db/conn")
const port = process.env.PORT || 80;

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

// Json Use(POST mate)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
app.use(express.static(static_path));

// view engine hbs
app.set("view engine", "hbs");

// templates
app.set("views", template_path);

// its partials file
hbs.registerPartials(partials_path);

// Url Mapping
app.get("/", (req, res) => {
    res.render("index")
});

app.get("/about", (req, res) => {
    res.render("about")
});

// login validation
app.get("/login", (req, res) => {
    res.render("login")
});

app.post("/login", async(req, res) => {
    try {

        const loginUser = new Login(req.body);
        console.log(req.body);
        const loginMensPost = await loginUser.save();
        res.send(loginMensPost)
    } catch (e) {
        res.status(400).send(e);
    }

});


// registration validation
app.get("/register", (req, res) => {
    res.render("register")
});

app.post("/register", async(req, res) => {
    try {
        const pass1 = req.body.pass1;
        const pass2 = req.body.pass2;


        if (pass1 === pass2) {
            const registerEmployee = new Register({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                phone: req.body.phone,
                pass1: req.body.pass1,
                pass2: req.body.pass2
            })

            const registerd = await registerEmployee.save();
            // console.log(registerd)
            res.status(201).render("login");

        } else {
            res.send("password are not matching")
        }

    } catch (error) {
        res.status(400).send(error);
    }

    // res.render("register")
});

// contactus Strts
app.get("/contact", (req, res) => {
    res.render("contact")
});

app.post("/contact", async(req, res) => {
    try {

        const user = new Contact(req.body);
        console.log(req.body);
        const insertMensPost = await user.save();
        res.send(insertMensPost)
    } catch (e) {
        res.status(400).send(e);
    }

})


app.listen(port, () => {
    console.log(`the address of port is :${port}`);
})