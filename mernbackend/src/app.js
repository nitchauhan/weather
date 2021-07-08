const express = require('express');
const jwt = require('jsonwebtoken');
const hbs = require('hbs')
const bcrypt = require('bcrypt');
// var session = require('express-session');
const path = require('path')
    // const general = client.channels.get(env.general);
const app = express()

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
app.use(express.urlencoded({ extended: false }));

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

app.get("/weather", (req, res) => {
    res.render("weather")
});


// login validation
app.get("/login", (req, res) => {
    res.render("login")
});

// app.post("/login", async(req, res) => {
//     try {

//         const loginUser = new Login(req.body);
//         const loginMensPost = await loginUser.save();
//         alert(loginMensPost)
//         res.send(loginMensPost);
//         res.render("index");
//     } catch (e) {
//         res.status(400).send(e);
//     }

// });


app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password)
        const useremail = await Register.findOne({ email: email });

        // const isMatch = await bcrypt.genSaltSynccompare(pass1, useremail.pass1);
        // console.log(isMatch)
        // if (isMatch) {
        //     res.status(201).render("/");
        // } else {
        //     res.send("invalid crendtils")

        // }
        if (useremail.pass1 === password) {
            res.status(201).render("/");

        } else {
            res.send("invalid ")
        }
    } catch (error) {
        // res.status(400).send("invalid login")
        res.status(400).send("error is" + error)
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

            console.log("othe name is" + registerEmployee);

            const token = await registerEmployee.generateAuthToken();
            console.log("the token part" + token)

            const registerd = await registerEmployee.save();
            console.log("the token part" + registerd)

            res.status(201).render("index");

        } else {
            res.send("password are not matching")
        }

    } catch (error) {
        res.status(400).send(error);
        // res.status(400).send("error is" + error)
        console.log("the err" + error);
    }


});

// contactus Strts
app.get("/contact", (req, res) => {
    res.render("contact")
});

// app.post("/contact", async(req, res) => {
//     try {

//         const user = new Contact({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             address: req.body.address
//         });
//         // console.log(req.body);


//         const insertMensPost = await user.save();
//         // res.send(insertMensPost)
//         res.render("index")
//         alert("you data sent it")
//     } catch (e) {
//         res.status(400).send(e);
//     }

// })



app.get("*", (req, res) => {
    res.render("404", {
        errmsg: "404 err page Not found"
    })
});

const createToken = async() => {
    const tomken = await jwt.sign({ _id: "60a3ecdb0f8cc6238491b802" }, "mynameisnitinchauhanandiamfreshersthatitmysite", {
        expiresIn: "2 seconds"
    });

    console.log(tomken);
    const userVer = await jwt.verify(tomken, "mynameisnitinchauhanandiamfreshersthatitmysite")
        // console.log(userVer)
};
createToken();


app.listen(port, () => {
    console.log("the port is" + port)
});