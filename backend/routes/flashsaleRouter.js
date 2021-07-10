var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var web3 = new Web3();

var contractData = require('./../contractData');
var FlashSaleDao = require('../dao/flashsale');

// Public
// GET Single item based on ID
router.get('/flashsale/:id', async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const data = await FlashSaleDao.getItemById(itemid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All Items based on category
router.get('/flashsale', async (req, res, next) => {
  try {
    const data = await FlashSaleDao.getItems();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All Items pagination
router.get('/flashsale/:pageIndex/:pageSize', async (req, res, next) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize);
  try {
    const data = await FlashSaleDao.getListItems(pageIndex, pageSize);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// Signing a transaction before purchase

router.post('/flashsale-sign', async function (req, res) {
  let userAddress = req.body.address;
  let nftHash = req.body.nft;
  var firstParameter = nftHash + userAddress;
  let privateKey = process.env.PRIVATE_KEY;
  let data = await web3.eth.accounts.sign(firstParameter.toString(), privateKey);
  console.log(data);
  return res.status(200).send(data);
});

// Public
// GET remaining slots
router.get('/flashsale-slots/:id', async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const data = await FlashSaleDao.getItemRemainingSlot(itemid);
    return res.status(200).send(data.toString());
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// POST items based on category
router.post('/flashsale', async (req, res, next) => {
  let saleItems = [
    {
      name: 'Sword',
      level: 3,
      original_price: '2.0',
      sell_price: '0.5',
      currency: 'BNB',
      image: 'QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5',
      remaining_quantity: 20,
      description: 'Base Damage: 30, Bonus: +7%, Accuracy: +5',
      category: 'sword',
      gallery: [
        'QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu',
        'QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4',
        'QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X',
      ],
    },
    {
      name: 'Big Knife',
      level: 3,
      original_price: '2.0',
      sell_price: '0.5',
      currency: 'BNB',
      image: 'Qmb69r56kXY4Z6w3ZJUuu7qSyNZYhdfLVPjckzhmKgQihB',
      remaining_quantity: 20,
      description: 'Base Damage: 32, Bonus: +5%, Accuracy: +4',
      category: 'big knife',
    },
    {
      name: 'Bow',
      level: 3,
      original_price: '2.0',
      sell_price: '0.5',
      currency: 'BNB',
      image: 'QmXhj7e9X3SYRegodCWPDqWo5wvHeCFCELr7bWgvKQxcBR',
      remaining_quantity: 20,
      description: 'Base Damage: 29, Bonus: +9%, Accuracy: +4',
      category: 'bow & arrow',
      gallery: [
        'QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg',
        'QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX',
        'QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR',
      ],
    },
    {
      name: 'Gun',
      level: 3,
      original_price: '2.0',
      sell_price: '0.5',
      currency: 'BNB',
      image: 'QmPgyQnuzXdLzWHJ9J21HSPF3oBjtAZXtS7jLvVRu7NBGv',
      remaining_quantity: 20,
      description: 'Base Damage: 36, Bonus: +5%, Accuracy: +3',
      category: 'gun',
    },
    {
      name: 'Tessen',
      level: 3,
      original_price: '2.0',
      sell_price: '0.5',
      currency: 'BNB',
      image: 'Qmd8HcuLGaJ8t2v77hhYNFpVgPHniDKiwTE6FwZzyjEURm',
      remaining_quantity: 20,
      description: 'Base Damage: 26, Bonus: +8%, Accuracy: +4',
      category: 'tessen',
    },
  ];

  try {
    const data = await FlashSaleDao.createItem([...saleItems]);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// DELETE items based on category
router.delete('/flashsale', async (req, res, next) => {
  try {
    const data = await FlashSaleDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});
module.exports = router;
