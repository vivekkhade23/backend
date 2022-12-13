const User = require("../model/User.model");
const authMiddleware = require("./authmiddleware");
const express = require('express');
const app = express.Router();




app.post("/signup", async (req, res) => {
    let { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).send("User Already Exists");
        } else {
            let newUser = await User.create(req.body);
            console.log(typeof (newUser.id), newUser.id);
            return res.send({
                token: `${newUser.id}:${newUser.email}`
            });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }

})

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).send("Authentication error");
        }
        res.set({
            token: `${user.id}:${user.email}`
        });
        res.cookie("token", `${user.id}:${user.email}`);
        let a = req.cookies;

        console.log(a.token);
        res.send({
            token: `${user.id}:${user.email}`
        });

    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.post("/logout", (req, res) => {
    try {
        res.clearCookie('token');
        res.send("logout successfully");
    } catch (e) {
        res.status(500).send(e);
    }

})
module.exports = app;