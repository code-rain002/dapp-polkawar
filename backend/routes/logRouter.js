var express = require("express");
var router = express.Router();
var logHelper = require("./../helper/logs");

// GET all logs
router.get("/log", async (req, res, next) => {
  try {
    const response = await logHelper.readAllLog();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.get("/test", async (req, res, next) => {
  try {

    return res.status(200).send("OK");
  } catch (error) {
    return res.status(400).send(error);
  }
});

// GET all logs by owner
router.get("/log/:owner", async (req, res, next) => {
  let owner = req.params.owner;
  try {
    const response = await logHelper.readLog(owner);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// POST New Log based on event
router.post("/log", async (req, res, next) => {
  let owner = req.body.owner;
  let status = req.body.status;
  let source = req.body.source;
  let transactionHash = req.body.transactionHash;
  let action = req.body.action;
  let info = req.body.info;

  try {
    const response = await logHelper.writeLog(
      owner,
      status,
      source,
      transactionHash,
      action,
      info
    );
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});
module.exports = router;
