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
  let saleItems = [
    {
      itemId: 31,
      name: "Sword",
      level: 3,
      original_price: "2.0",
      sell_price: "1.0",
      currency: "BNB",
      hashImage: "QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5",
      remaining_quantity: 20,
      description: "Base Damage: 215, Accuracy: +150, Bonus: +15%",
      category: "sword",
      properties: {
        bDam: 215,
        accuracy: 150,
        bonus: 15,
      },
      hashItem: "QmXrpvBfbyZpKEMpw3jSbMbaAH56guZim2FbyvZ8x1M4MP",
    },
    {
      itemId: 34,
      name: "Big Knife",
      level: 3,
      original_price: "2.0",
      sell_price: "1.0",
      currency: "BNB",
      hashImage: "Qmb69r56kXY4Z6w3ZJUuu7qSyNZYhdfLVPjckzhmKgQihB",
      remaining_quantity: 20,
      description: "Base Damage: 225, Accuracy: +125, Bonus: +13%",
      category: "big knife",
      properties: {
        bDam: 225,
        accuracy: 125,
        bonus: 13,
      },
      hashItem: "QmTSCJHiCrxUC57jKqkVNtMBoTLRmwVz1ZZRdUNauq2269",
    },
    {
      itemId: 37,
      name: "Tessen",
      level: 3,
      original_price: "2.0",
      sell_price: "1.0",
      currency: "BNB",
      hashImage: "Qmd8HcuLGaJ8t2v77hhYNFpVgPHniDKiwTE6FwZzyjEURm",
      remaining_quantity: 20,
      description: "Base Damage: 180, Accuracy: +145, Bonus: +17%",
      category: "tessen",
      properties: {
        bDam: 180,
        accuracy: 145,
        bonus: 17,
      },
      hashItem: "QmcUXvqHqZ13gjzpw6LcwEJ1XPzFZKJhtHYFDMPNVoaDfa",
    },
    {
      itemId: 40,
      name: "Bow & Arrow",
      level: 3,
      original_price: "2.0",
      sell_price: "1.0",
      currency: "BNB",
      hashImage: "QmXhj7e9X3SYRegodCWPDqWo5wvHeCFCELr7bWgvKQxcBR",
      remaining_quantity: 20,
      description: "Base Damage: 190, Accuracy: +160, Bonus: +14%",
      category: "bow & arrow",
      properties: {
        bDam: 45,
        accuracy: 40,
        bonus: 10,
      },
      hashItem: "QmPdQnpA861SN3fLz1QLCAvGU1r2ehRvUvFXNgPnhrH7BU",
    },
    {
      itemId: 43,
      name: "Gun",
      level: 3,
      original_price: "2.0",
      sell_price: "1.0",
      currency: "BNB",
      hashImage: "QmPgyQnuzXdLzWHJ9J21HSPF3oBjtAZXtS7jLvVRu7NBGv",
      remaining_quantity: 20,
      description: "Base Damage: 250, Accuracy: +90, Bonus: +12%",
      category: "gun",
      properties: {
        bDam: 250,
        accuracy: 90,
        bonus: 12,
      },
      hashItem: "Qmbqsk52iA6pB8rNBEars7jQKFgzXygoRE14kkxFZZX9p2",
    },
  ];

  try {
    const data = await FlashSaleDao.createItem([...saleItems]);
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
