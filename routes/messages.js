const Router = require("express").Router;
const Message = require("../models/message");
const { ensureLoggedIn,
        ensureCorrectUser } = require("../middleware/auth");

const router = new Router();

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id",
    ensureLoggedIn,
    // Eventually need to add authorization for only users who 
    // wrote or reveived the message.
    async function (req, res, next){
        let id = req.params.id;
        try {
            let message = await Message.getMessage(id);

            if (!message) {
                throw { message: `No such message: ${id}`, status: 404 };
            }
            return res.json({ message });

        } catch (err) {
            return next(err);
        }
});


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

module.exports = router;