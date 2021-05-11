var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');
var FormData = require('form-data');
var fs = require('fs');

var ItemDao = require('../dao/item');

// Public
// GET Single item based on ID
router.get('/item/:id', async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const data = await ItemDao.getItemById(itemid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All Items based on category
router.get('/items/:category', async (req, res, next) => {
  console.log(req.params.category);
  try {
    const data = await ItemDao.getItems(req.params.category);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All Items pagination
router.get('/items/:pageIndex/:pageSize', async (req, res, next) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize);
  try {
    const data = await ItemDao.getListItems(pageIndex, pageSize);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// POST items based on category
router.post('/item', async (req, res, next) => {
  var armorData = [
    {
      name: 'Armor',
      price: '0.1',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
      gallery: [
        'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
        'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
        'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
      ],
    },
    {
      name: 'Armor Archer',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmXeawPHD5Gqug8gm8RNQ8xjKGxboHRu52GfBjMnJBBkgn',
      category: 'armor',
      gallery: [
        'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
        'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
        'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
      ],
    },
    {
      name: 'Armor Magician',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmfHwGHzL98a9W2r6MdB4pbCzCj3NkSYQ9CFmaggi1tLsk',
      category: 'armor',
      gallery: [
        'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
        'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
        'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
      ],
    },
    {
      name: 'Armor Warrior',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmXfuoXRaLUD1RWkzxxe6oLJGHuvGVnnGeoUfJuQ33SKc2',
      category: 'armor',
      gallery: [
        'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
        'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
        'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
      ],
    },
    {
      name: 'Armor',
      price: '1.8',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
      gallery: [
        'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
        'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
        'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
      ],
    },
    {
      name: 'Armor',
      price: '2.0',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
      gallery: [
        'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
        'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
        'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
      ],
    },
    {
      name: 'Armor',
      price: '2.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
      gallery: [
        'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
        'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
        'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
      ],
    },
  ];
  var helmetData = [
    {
      name: 'Helmet',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
      gallery: [
        'QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3',
        'QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4',
        'QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf',
      ],
    },
    {
      name: 'Helmet Archer',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmPunBCQtPfD1ezDQS9CB6ZCePVqhDWbywucffiUnrV47t',
      category: 'helmet',
      gallery: [
        'QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3',
        'QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4',
        'QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf',
      ],
    },
    {
      name: 'Helmet Magician',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmTviHX6baCsB4bHWzFvrnhh9wCtEVqw8vgrDcURyJFhVi',
      category: 'helmet',
      gallery: [
        'QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3',
        'QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4',
        'QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf',
      ],
    },
    {
      name: 'Helmet Warrior',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmULgjWZWnkoh6MxsP4JbYyvnRzXFzf3aGjHTmegmgtogG',
      category: 'helmet',
      gallery: [
        'QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3',
        'QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4',
        'QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf',
      ],
    },
    {
      name: 'Helmet',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
      gallery: [
        'QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3',
        'QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4',
        'QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf',
      ],
    },
    {
      name: 'Helmet',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
      gallery: [
        'QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3',
        'QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4',
        'QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf',
      ],
    },
    {
      name: 'Helmet',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
      gallery: [
        'QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3',
        'QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4',
        'QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf',
      ],
    },
  ];
  var swordData = [
    {
      name: 'Normal Sword',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
      gallery: [
        'QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu',
        'QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4',
        'QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X',
      ],
    },
    {
      name: 'Sword',
      price: '0.4',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmUWwRX9jQmfDyRgi7mkG5Bxj3JmfuedpHN1YiuvQgmWB8',
      category: 'sword',
      gallery: [
        'QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu',
        'QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4',
        'QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X',
      ],
    },
    {
      name: 'Lightening Sword',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
      gallery: [
        'QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu',
        'QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4',
        'QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X',
      ],
    },
    {
      name: 'Sharp Sword',
      price: '0.7',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
      gallery: [
        'QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu',
        'QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4',
        'QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X',
      ],
    },
    {
      name: 'Fire Sword',
      price: '1.0',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
      gallery: [
        'QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu',
        'QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4',
        'QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X',
      ],
    },
  ];
  var knifeData = [
    {
      name: 'Knife',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'big knife',
    },
    {
      name: 'Knife',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmW7xTbUrhhoCQtzNhp3SUMrp7s8sEfvuoyq2ASNbrhWQ3',
      category: 'big knife',
    },
    {
      name: 'Knife',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'big knife',
    },
    {
      name: 'Knife',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'big knife',
    },
    {
      name: 'Big Knife',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'big knife',
    },
  ];
  var tessenData = [
    {
      name: 'Tessen',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'Qma4sijb9J3FE4aLUhog5N697TMzTzUXV7EMECjgbg2oTZ',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
  ];
  var bowData = [
    {
      name: 'Bow',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow & arrow',
      gallery: [
        'QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg',
        'QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX',
        'QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR',
      ],
    },
    {
      name: 'Bow',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmbbESs5Hh25yfnpXr6oqcGLjADTrc7s7YsgCoso81eiqq',
      category: 'bow & arrow',
      gallery: [
        'QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg',
        'QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX',
        'QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR',
      ],
    },
    {
      name: 'Bow',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow & arrow',
      gallery: [
        'QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg',
        'QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX',
        'QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR',
      ],
    },
    {
      name: 'Bow',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow & arrow',
      gallery: [
        'QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg',
        'QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX',
        'QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR',
      ],
    },
    {
      name: 'Bow',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow & arrow',
      gallery: [
        'QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg',
        'QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX',
        'QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR',
      ],
    },
  ];
  var gunData = [
    {
      name: 'Normal Gun',
      price: '1.3',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmWAdCmcPVhryxHMcgSKcHa88B5S8rhNCYLTDmKKg33iU4',
      category: 'gun',
    },
    {
      name: 'Speed Gun',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
    {
      name: 'Light Gun',
      price: '1.8',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
    {
      name: 'Fast Gun',
      price: '2.0',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
    {
      name: 'Fire Gun',
      price: '2.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
  ];
  var wingData = [
    {
      name: 'Wing',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
    {
      name: 'Wing Archer',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmWUC8UvoWprjdiEzjE8hMpsdTYVHo9NSvWSmwNcUTiyit',
      category: 'wing',
    },
    {
      name: 'Wing Magician',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmPd33F1dPDXAdto7qJkNg1WqoQYNfVF1SHb7z9bwuejWU',
      category: 'wing',
    },
    {
      name: 'Wing Warrior',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmbfLPK8tLzAgBMsN5oeFj8N16tD8D7r9bSmA4LMUtBQDr',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
  ];
  var sceptreData = [
    {
      name: 'Sceptre',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
      gallery: [
        'QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee',
        'QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV',
        'QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav',
      ],
    },
    {
      name: 'Sceptre',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmfFMuyunWj2ekumVJAJBidTa5XnBgXiHMbSsWWbk9EQz6',
      category: 'sceptre',
      gallery: [
        'QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee',
        'QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV',
        'QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav',
      ],
    },

    {
      name: 'Sceptre',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
      gallery: [
        'QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee',
        'QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV',
        'QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav',
      ],
    },
    {
      name: 'Sceptre',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
      gallery: [
        'QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee',
        'QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV',
        'QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav',
      ],
    },
    {
      name: 'Sceptre',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
      gallery: [
        'QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee',
        'QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV',
        'QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav',
      ],
    },
  ];
  var magicvaseData = [
    {
      name: 'Magic Vase',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
      gallery: [
        'QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2',
        'QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x',
        'QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3',
        'QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8',
      ],
    },
    {
      name: 'Magic Vase',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmZ9epNvmbH6cndrKexxh3E7FLQvzfp89nvSehVuZsZ6JX',
      category: 'magic vase',
      gallery: [
        'QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2',
        'QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x',
        'QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3',
        'QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8',
      ],
    },
    {
      name: 'Magic Vase',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
      gallery: [
        'QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2',
        'QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x',
        'QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3',
        'QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8',
      ],
    },
    {
      name: 'Magic Vase',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
      gallery: [
        'QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2',
        'QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x',
        'QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3',
        'QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8',
      ],
    },
    {
      name: 'Magic Vase',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
      gallery: [
        'QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2',
        'QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x',
        'QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3',
        'QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8',
      ],
    },
  ];
  try {
    const data = await ItemDao.createItem([
      ...gunData,
      ...swordData,
      ...bowData,
      ...armorData,
      ...helmetData,
      ...wingData,
      ...sceptreData,
      ...knifeData,
      ...tessenData,
      ...magicvaseData,
    ]);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// DELETE items based on category
router.delete('/item', async (req, res, next) => {
  try {
    const data = await ItemDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});
module.exports = router;
