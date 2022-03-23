const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
const mongoose = require("mongoose");
const register = require("./models/register.js")
// const fs = require("fs");
require("dotenv").config();


mongoose
   .connect(process.env.URI)
   .then((res) =>{
     console.log("Database connected");

     app.listen(PORT, () =>{
       console.log("listening on port", PORT)
     });
   })
      .catch((err) => {
        console.log("error connecting", err);
      });
 
const bodyParser = require("body-parser");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/reg", (req, res) =>{
    res.render("register", { error: false, success: false, values: {} });
});
app.post("/register", (req, res) => {
    // res.render("contact");
    // res.json({})
    console.log("The request posted to Registration", req.body);
    // JSON
    // JSON.stringify()
    let result = JSON.stringify(req.body);

    console.log(result);
    console.log(typeof result, typeof req.body);
    console.log(result.name);
    let name = req.body.name;
    let date = new Date().toDateString();
    let path = "./people/" + name + "-" + date + ".txt";
  
    //validation
    if (!req.body.name) {
      res.render("register", {
        error: "Name is required",
        success: false,
        values: req.body,
      });
    } else if (!req.body.email) {
      res.render("register", {
        error: "Email is required",
        success: false,
        values: req.body,
      });
    }else if (!req.body.password) {
        res.render("register", {
          error: "Password must be set",
          success: false,
          values: req.body,
        });
      }else if (!req.body.phone) {
        res.render("register", {
          error: "please input your phone number",
          success: false,
          values: req.body,
        });
      }
    // fs.writeFile(path, result, (err) => {
    //   if (err) {
    //     console.log(err);
    //     res.render("register", {
    //       error: "err:" + err,
    //       success: false,
    //       values: {},
    //     });
    const payload = {
      fullname: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    };
    // save to database
    const registerR = new register(payload);
    registerR
      .save()
      .then((result) => {
        console.log("Registration recorded", result);
        res.render("register", {
          error: false,
          success: "Registration Successful",
          values: {},
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("register", {
          error: "err:" + err,
          success: false,
          values: {},
        });
      });
    });  