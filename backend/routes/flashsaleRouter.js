var express = require("express");
var router = express.Router();
var Web3 = require("web3");
var web3 = new Web3();
var FlashSaleDao = require("../dao/flashsale");

// Public
// GET Single item based on ID
router.get("/flashsale/:id", async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const data = await FlashSaleDao.getItemById(itemid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All Items based on category
router.get("/flashsale", async (req, res, next) => {
  try {
    const data = await FlashSaleDao.getItems();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All Items pagination
router.get("/flashsale/:pageIndex/:pageSize", async (req, res, next) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize);
  try {
    const data = await FlashSaleDao.getListItems(pageIndex, pageSize);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// Signing a transaction before purchase

router.post("/flashsale-sign", async function (req, res) {
  let userAddress = req.body.address;
  let nftHash = req.body.nft;
  var firstParameter = nftHash + userAddress;

  // Descrypting the key for sign
  const actualKey = () => {
    let oldKey = process.env.PRIVATE_KEY;
    let newKey = oldKey.split("").reverse().join("");
    return newKey;
  };
  let privateKey = actualKey();
  let data = await web3.eth.accounts.sign(
    firstParameter.toString(),
    privateKey
  );
  console.log(data);
  return res.status(200).send(data);
});

// Public
// GET remaining slots
router.get("/flashsale-slots/:itemId", async (req, res, next) => {
  const itemId = req.params.itemId;

  try {
    const data = await FlashSaleDao.getItemRemainingSlot(itemId);
    return res.status(200).send(data.toString());
  } catch (error) {
    console.log(error);
    return res.status(400).send("error");
  }
});

// Public
// POST items based on category
router.post("/flashsale", async (req, res, next) => {
  let originalPrice = "2.0";
  let sellPrice = "1.0";
  let saleQuantity = 20;

  let saleItems = [4, 5, 6, 30, 33, 36, 39, 42, 45, 48];
  try {
    const data = await FlashSaleDao.createItem(
      saleItems,
      originalPrice,
      sellPrice,
      saleQuantity
    );
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// DELETE items based on category
router.delete("/flashsale", async (req, res, next) => {
  try {
    const data = await FlashSaleDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});
module.exports = router;
