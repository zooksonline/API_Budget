const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Auth
router.post("/register", (req, res) => {
  const registerUser = async () => {
    // DB Config
    const db = config.get("mongoEBudget");
    const option = config.get("option");
    await mongoose
      .connect(db, option, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        const User = require("../../models/User");
        const { buasri_id, email, role, dep, dep_budget } = req.body;
        const newUser = new User({
          buasri_id,
          email,
          role,
          dep,
          dep_budget,
        });
        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 28800 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token: token,
                  user,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  registerUser();
});

module.exports = router;
