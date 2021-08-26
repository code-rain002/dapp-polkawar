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
      itemId: 30,
      name: "Sword",
      level: 2,
      original_price: "1.0",
      sell_price: "0.7",
      currency: "BNB",
      hashImage: "QmUWwRX9jQmfDyRgi7mkG5Bxj3JmfuedpHN1YiuvQgmWB8",
      remaining_quantity: 20,
      description: "Base Damage: 50, Accuracy: +40, Bonus: +10%",
      category: "sword",
      properties: {
        bDam: 50,
        accuracy: 40,
        bonus: 10,
      },
      hashItem: "QmeTsCqR4fRRbn8u5m5fTce3eymJK6HKXbnrXvh7pk3Ygn",
    },
    {
      itemId: 33,
      name: "Big Knife",
      level: 2,
      original_price: "1.0",
      sell_price: "0.7",
      currency: "BNB",
      hashImage: "QmW7xTbUrhhoCQtzNhp3SUMrp7s8sEfvuoyq2ASNbrhWQ3",
      remaining_quantity: 20,
      description: "Base Damage: 55, Accuracy: +36, Bonus: +8%",
      category: "big knife",
      properties: {
        bDam: 55,
        accuracy: 36,
        bonus: 8,
      },
      hashItem: "QmTSCJHiCrxUC57jKqkVNtMBoTLRmwVz1ZZRdUNauq2269",
    },
    {
      itemId: 36,
      name: "Tessen",
      level: 2,
      original_price: "1.0",
      sell_price: "0.7",
      currency: "BNB",
      hashImage: "Qma4sijb9J3FE4aLUhog5N697TMzTzUXV7EMECjgbg2oTZ",
      remaining_quantity: 20,
      description: "Base Damage: 40, Accuracy: +39, Bonus: +12%",
      category: "tessen",

      properties: {
        bDam: 40,
        accuracy: 39,
        bonus: 12,
      },
      hashItem: "QmQasK9t7bbJQAZX3ZkepfYvs71KP6bBXJiS6e4MXWofEc",
    },
    {
      itemId: 39,
      name: "Bow & Arrow",
      level: 2,
      original_price: "1.0",
      sell_price: "0.7",
      currency: "BNB",
      hashImage: "QmbbESs5Hh25yfnpXr6oqcGLjADTrc7s7YsgCoso81eiqq",
      remaining_quantity: 20,
      description: "Base Damage: 45, Accuracy: +40, Bonus: +10%",
      category: "bow & arrow",
      properties: {
        bDam: 45,
        accuracy: 40,
        bonus: 10,
      },
      hashItem: "Qmc9gjzN3JmeJQEAsuWZVuhkXu4xyML3p4ho1HTA4RAxN3",
    },
    {
      itemId: 42,
      name: "Gun",
      level: 2,
      original_price: "1.0",
      sell_price: "0.7",
      currency: "BNB",
      hashImage: "QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ",
      remaining_quantity: 20,
      description: "Base Damage: 60, Accuracy: +25, Bonus: +8%",
      category: "gun",
      properties: {
        bDam: 60,
        accuracy: 25,
        bonus: 8,
      },
      hashItem: "QmZ6EBCS42JdnG339yuPMKJSGJeoLogPBBdwGEGqkUnHcP",
    },

    {
      itemId: 45,
      name: "Sceptre",
      level: 2,
      original_price: "1.0",
      sell_price: "0.7",
      currency: "BNB",
      hashImage: "QmfFMuyunWj2ekumVJAJBidTa5XnBgXiHMbSsWWbk9EQz6",
      remaining_quantity: 20,
      description: "Base Damage: 48, Accuracy: +25, Bonus: +7%",
      properties: {
        bDam: 28,
        accuracy: 25,
        bonus: 7,
      },
      category: "sceptre",
      hashItem: "QmXpxRb6Ja3Yc1f3ENktQNQH6MA82zRBeFuvCcZCKKa33H",
    },
    {
      itemId: 48,
      name: "Magic Vase",
      level: 2,
      original_price: "1.0",
      sell_price: "0.7",
      currency: "BNB",
      hashImage: "QmZ9epNvmbH6cndrKexxh3E7FLQvzfp89nvSehVuZsZ6JX",
      remaining_quantity: 20,
      description: "Base Damage: 12, Accuracy: +5, Bonus: +3%",
      category: "magic vase",
      properties: {
        bDam: 12,
        accuracy: 5,
        bonus: 3,
      },
      hashItem: "QmQHRGeJWv9NQaB1HVG1K3MN7FoRrqJdRoaHQH33P4DAfU",
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
