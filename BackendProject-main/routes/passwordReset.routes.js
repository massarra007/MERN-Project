import express from "express";
const router = express.Router();

import Users from "../models/users.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import Token from "../models/token.model.js";
import Joi from "joi";
import crypto from "crypto";
import passwordComplexity from "joi-password-complexity";

//send password link
router.post("/", async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const url = `http://localhost:3000/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password Reset", url);

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
// verify password reset link
router.get("/:id/:token", async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link1" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link2" });

    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
//  set new password
router.post("/:id/:token", async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await Users.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link1" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link2" });

    if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.post("/:id", async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await Users.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link1" });
    if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
export default router;
