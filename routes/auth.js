"use strict";

const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require("../db");
const { UnauthorizedError } = require("../expressError");
const User = require("../models/user");

const Router = require("express").Router;
const router = new Router();

/** POST /login: {username, password} => {token} */
router.post('/login', async function(req,res,next){
  const {username, password} = req.body;
  if(await User.authenticate(username,password)){
    const token = jwt.sign({ username }, SECRET_KEY);
    User.updateLoginTimestamp(username);
    return res.json({ token });
  }else{
    throw new UnauthorizedError("Invalid username");
  }
})



/** POST /register: registers, logs in, and returns token.
 * {username, password, first_name, last_name, phone} => {token}.
 */

router.post('/register', async function(req,res,next){
  const user = User.register(req.body);
  const token = jwt.sign({ username }, SECRET_KEY);
  User.updateLoginTimestamp(username);
  return res.json({ token });
})



module.exports = router;
