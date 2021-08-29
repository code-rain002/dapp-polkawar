var express = require("express");
var router = express.Router();
var UserDao = require("../dao/user");

// GET current user details based on Address
router.get("/user/:address", async (req, res, next) => {
  const userAddress = req.params.address;

  try {
    const data = await UserDao.getUserByAddress(userAddress);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// POST create new user based on details
router.post("/user", async (req, res, next) => {
  var userData = {
    address: req.body.address,
    username: req.body.username ? req.body.username : "",
    avatar: req.body.avatar ? req.body.avatar : "",
  };

  try {
    const data = await UserDao.createUser(userData);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// PATCH update user details based on data
router.patch("/user/username", async (req, res, next) => {
  var userData = {
    username: req.body.username ? req.body.username : "",
    address: req.body.address,
  };

  try {
    const data = await UserDao.updateUsername(userData);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});
module.exports = router;
