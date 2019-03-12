const jwt = require("jsonwebtoken");
const  { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");
const Router = require("express").Router;
const User = require("../models/user");
const { ensureLoggedIn,
        ensureCorrectUser } = require("../middleware/auth");
const router = new Router();

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/",
    ensureLoggedIn,
    async function (req, res, next){
        try {
            let users = await User.all();
            return res.json(users);
        } catch (err) {
            return next(err);
        }
});


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username",
    ensureLoggedIn,
    async function (req, res, next){
        let username = req.params.username;
        try {
            let user = await User.getUser(username);
            return res.json(user);
        } catch (err) {
            return next(err);
        }
});


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/from",
ensureLoggedIn,
ensureCorrectUser,
async function (req, res, next){
    let username = req.params.username;
    try {
        let messages_from = await User.messagesFrom(username);
        return res.json(messages_from);
    } catch (err) {
        return next(err);
    }
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to",
ensureLoggedIn,
ensureCorrectUser,
async function (req, res, next){
    let username = req.params.username;
    try {
        let messages_to = await User.messagesTo(username);
        return res.json(messages_to);
    } catch (err) {
        return next(err);
    }
});


module.exports = router;