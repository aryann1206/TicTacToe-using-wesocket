const express = require("express");
let { userModel, gameModel } = require("./database");
let jwt = require("jsonwebtoken");
const router = express.Router();
let { usersignup, gamecreate } = require("./zod");

router.post("/signup", async (req, res) => {
    let { success, data, error } = usersignup.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: error.message
        })
        return;
    }

    let user = await userModel.create({
        username: data.username,
        password: data.password
    })
    let token = jwt.sign({ username: user.username, userId: user._id }, "khvefilhgvwflihvsdl");
    res.status(200).json({
        message: "created successfully",
        token
    })

})



router.post("/signin", async (req, res) => {
    let { username, password } = req.body;

    let user = await userModel.findOne({ username, password });
    if (user) {
        let token = jwt.sign({ userId: user._id }, "khvefilhgvwflihvsdl");
        res.status(201).json({
            message: " successfully loggined",
            token
        });
        return;
    }
    res.status(401).json({
        message: "username or password incorrect ",
    });
    return;
})



function middleware(req, res, next) {

    let token = req.headers.token;
    let user = jwt.verify(token, "khvefilhgvwflihvsdl");
    req.userId = user.userId;
    req.username = user.username;
    next();

}


router.post("/game", middleware, async (req, res) => {
    let { success, data, error } = gamecreate.safeParse(req.body);
    if (success) {
        let game = await gameModel.create({
            name: data.name,
            player1: req.userId,
        })
        res.status(201).json({
            message: "game created",
            gameid: game._id
        })
        return;
    }
    res.status(401).json({
        message: error.message
    })
    return;
})





router.post("/join", middleware, async (req, res) => {
    let { success, data, error } = usersignup.safeParse(req.body);
    if (success) {
        let game = await gameModel.findOne({
            name: data.name
        })
        if (game) {
            game.player2 = req.userId;
            await game.save();
        }
        res.status(201).json({
            message: "joined",
            gameid: game._id
        })
        return;
    }
    res.status(401).json({
        message: error.message
    })
    return;
})
