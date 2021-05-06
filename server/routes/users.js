const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/config");
const { authenticate } = require("../auth/user.auth");

REGISTER: {
  router.post("/register", async (req, res) => {
    try {
      const { email, password, firstname, lastname } = req.body;
      let exists = await User.countDocuments({ email });
      if (exists > 0) {
        return res
          .status(200)
          .send({ exists: true, success: false, message: "Email is exists" });
      }
      const hashedPass = await bcrypt.hash(password, Number(config.saltRounds));

      let user = await User.create({
        email,
        password: hashedPass,
        firstname,
        lastname,
      });
      res.status(200).send({
        user,
        message: "User has registered successfully",
        success: true,
      });
    } catch (error) {
      res
        .status(400)
        .send({ error, message: "Registration failed", success: false });
    }
  });
}

LOGIN: {
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });

      const isPassRight = await bcrypt.compare(password, user.password);
      if (!isPassRight) throw "credentials is not correct";

      const token = jwt.sign({ _id: user._id }, config.jwtPrivateKey);
      delete user.password;
      res.status(200).send({
        message: "User logged in successfully",
        success: true,
        user,
        token,
      });
    } catch (error) {
      res
        .status(400)
        .send({ error, message: "Logging in failed", success: false });
    }
  });
}

DELETE_PATCH: {
  router
    .route("/")
    .patch(authenticate, async (req, res) => {
      try {
        let updates = req.body;
        delete updates.password;
        const user = await User.findByIdAndUpdate(
          { _id: req.signData },
          { ...updates },
          { new: true }
        ).exec();
        res
          .status(200)
          .send({ user, success: true, message: "Updated successfully" });
      } catch (error) {
        res.status(400).send({ success: false, message: "Failed to updated" });
      }
    })
    .delete(authenticate, async (req, res) => {
      try {
        await User.deleteOne({ _id: req.signData._id });
        res
          .status(200)
          .send({ message: "successfully deleted", success: true });
      } catch (error) {
        res
          .status(404)
          .send({ error, message: "Failed to delete", success: false });
      }
    });
}

CHANGE_PASSWORD: {
  router.patch("/changepassword", authenticate, async (req, res) => {
    try {
      const { password, newPassword } = req.body;
      const { _id } = req.signData;
      let user = await User.findOne({ _id });
      /** compare the old password */
      const isPassRight = await bcrypt.compare(password, user.password);
      console.log(isPassRight, "\n");
      if (!isPassRight) throw "credentials is not correct";

      /** hashing the new password */
      const hashedPass = await bcrypt.hash(
        newPassword,
        Number(config.saltRounds)
      );

      user = User.findByIdAndUpdate(
        { _id: user._id },
        { password: hashedPass },
        {
          new: true,
        }
      ).exec();
      res.status(200).send({
        success: true,
        user,
        message: "Password updated successfully",
      });
    } catch (error) {
      res
        .status(400)
        .send({ success: false, error, message: "Faild to update" });
    }
  });
}
module.exports = router;
