const jwt = require("jsonwebtoken");
const   { SECRET_KEY,
    BCRYPT_WORK_ROUNDS,} 
  = require("../config");

const Router = require("express").Router;
const User = require("../models/user");

const router = new Router();

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async function(req, res, next) {
    try {
        const { username, password } = req.body;
        if (await User.authenticate(username, password)) {
            await User.updateLoginTimestamp(username);
            let token = jwt.sign({ username }, SECRET_KEY);
            return res.json({token});
        }
        throw new ExpressError("Invalid username/password",400);
    } catch (err) {
      return next(err);
    }
  }); 

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async function(req, res, next) {
    try {
        const { username, password } = req.body;
        if (await User.authenticate(username, password)) {
            await User.updateLoginTimestamp(username);
            let token = jwt.sign({ username }, SECRET_KEY);
            return res.json({token});
        }
        throw new ExpressError("Invalid username/password",400);
    } catch (err) {
      return next(err);
    }
  }); 