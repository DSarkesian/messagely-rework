"use strict";

const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { NotFoundError } = require("../expressError");
const db = require("../db");
/** User of the site. */

class User {


  /** Register new user. Returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(`
    INSERT INTO users (
      username,
      password,
      first_name,
      last_name,
      phone,
      join_at,
      last_login_at)
      VALUES
        ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
      RETURNING (username, password, first_name, last_name, phone) `,
      [username, hashedPassword, first_name, last_name, phone]);
      console.log(result.rows)
      return result.rows
  }

  /** Authenticate: is username/password valid? Returns boolean. */

  static async authenticate(username, password) {
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name}, ...] */

  static async all() {
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) {
  }
}


module.exports = User;