// jshint esversion: 6

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "thisisTooksTanmay@$5M";

// ROUTE1: creating a user using POST request on /api/auth/
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name.").isLength({ min: 3 }),
    body("email", "Enter a valid Email.").isEmail(),
    body("password", "Password should be more than 6 characters.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    // check for validity of name, email and password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: "Improper Validation!" });
    }

    // try finding the user or if creating it, if error send a bad request.
    try {
      const user = await User.findOne({ success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email Already exists!" });
      }
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(req.body.password, salt);
      const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword,
      });
      const data = {
        user: {
          id: await createUser.id,
        },
      };

      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Some error occured!");
    }
  }
);

// ROUTE2: authenticate a user using email and password using POST request;
router.post(
  "/login",
  [
    body("email", "Enter a valid Email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    // check for validity of email
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: "Improper Validation!" });
    }

    const { email, password } = req.body;
    try {
      const findUser = await User.findOne({ email: email });
      if (!findUser) {
        return res
          .status(400)
          .json({ success, error: "Try login with correct credentials." });
      }

      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ success, error: "Try login with correct credentials." });
      }
      const data = {
        user: {
          id: await findUser.id,
        },
      };

      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error!");
    }
  }
);

// ROUTE3: get user data after logging in, using: POST request at "/api/auth/getuser"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = await req.user.id;
    const findUser = await User.findById(userId).select("-password");
    res.send(findUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
