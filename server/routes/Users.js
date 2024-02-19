const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware');

// Everytime use sequelize, use async await


router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({username: username, password: hash});
    });
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({where: {username:username}}) // tells sequelize to go to Users table and find one instance where inputted username is in the username column

    if (!user) {
        return res.json({error: "user doesnt exist"});
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.json({error: "Wrong username and password combination"});
            } else {

                const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
                return res.json({token: accessToken, username: username, id: user.id});
            }
    })
}})

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
})

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;                   // dont send password 
    const basicInfo = await Users.findByPk(id, {attributes: {exclude:['password']}});

    res.json(basicInfo);
})



module.exports = router;