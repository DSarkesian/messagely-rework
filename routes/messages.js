"use strict";

const Router = require("express").Router;
const router = new Router();

router.get("/", ensureLoggedIn, async function (req, res, next) {
  let users = await User.all();
  return res.json({ users });
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  let user = await User.get(req.params.username);
  return res.json({ user });
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

router.get("/:username/to", ensureCorrectUser, async function (req, res, next) {
  let messages = await User.messagesTo(req.params.username);
  return res.json({ messages });
});


module.exports = router;
