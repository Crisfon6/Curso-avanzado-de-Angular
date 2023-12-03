const User = require("../models/user");
const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generateJwt } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;
  const limit = 5;
  try {
    const [users, total] = await Promise.all([
      User.find().skip(from).limit(limit),
      User.count(),
    ]);

    res.json({
      ok: true,
      users,
      // uid: req.uid,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error...review logs",
    });
  }
};
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const emailRegistered = await User.findOne({ email });
    if (emailRegistered) {
      return res.status(400).json({ ok: "false", msg: "Email already taked" });
    }
    const user = new User(req.body);
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    const userSaved = await user.save();
    const token = await generateJwt(userSaved._id);
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error...review logs",
    });
  }
};
const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const user = await User.findById(uid);
    if (user.google)
      return res.status(401).json({ ok: false, msg: "Not allowed." });
    if (!user) {
      return res.status(404).json({ ok: false, msg: "User no found" });
    }

    // update
    const { password, google, email, ...fields } = req.body;

    if (user.email !== email) {
      const userEmail = await User.find({ email });
      if (userEmail.length > 0) {
        return res
          .status(400)
          .json({ ok: "false", msg: "Email already taked" });
      }
    }
    fields.email = email;
    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });
    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Unexpected error." });
  }
};
const updatePassword = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ ok: true, msg: "User no found." });
    }
    const { password } = req.body;

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    const encryptPassword = bcryptjs.hashSync(password, salt);

    const userUpdated = await User.findByIdAndUpdate(
      id,
      { password: encryptPassword },
      { new: true }
    );
    return res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Unexpected error." });
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ ok: false, msg: "User no found" });
    }
    await User.findByIdAndDelete(id);
    return res.json({ ok: true, msg: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Unexpected error." });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
};
