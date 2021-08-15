var express = require("express");
var router = express.Router();

var UserItemDao = require("../dao/useritem");

// Public
// GET Single item based on ID
router.get("/useritem/:id", async (req, res, next) => {
  const itemid = req.params.id;

  try {
    const data = await UserItemDao.getItemById(itemid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All User Items
router.get("/useritems", async (req, res, next) => {
  try {
    const data = await UserItemDao.getAllItems();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All User Items based on owner address
router.get("/useritems/:owner", async (req, res, next) => {
  let ownerAddress = req.params.owner;
  console.log(ownerAddress);
  try {
    const data = await UserItemDao.getItems(ownerAddress);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// POST Add items into users list
router.post("/useritem", async (req, res, next) => {
  var soldItem = {
    tokenId: req.body.token_id,
    itemId: req.body.item_id,
    comboId: req.body.combo_id ? req.body.combo_id : "-1",
    pId:
      req.body.p_id !== null && req.body.p_id !== undefined
        ? req.body.p_id
        : "-1",
    price:
      req.body.price !== null && req.body.price !== undefined
        ? req.body.price
        : "",
    tokenType: req.body.token_type,
    event: req.body.event,
    owner: req.body.owner,
    buyDate: req.body.buydate,
  };

  try {
    const data = await UserItemDao.createItem(
      soldItem,
      req.body.owner,
      req.body.fs_item_id
    );
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// PUT items based on category
router.put("/useritem/:item_id", async (req, res, next) => {
  var itemId = req.params.item_id;
  console.log(itemId);
  try {
    const data = await UserItemDao.updateItemOwner(itemId);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// DELETE items based on category
router.delete("/useritem", async (req, res, next) => {
  try {
    const data = await UserItemDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

router.post("/update-item", async (req, res, next) => {
  try {
    const data = await UserItemDao.updateData(req.body.tokenId);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

module.exports = router;
