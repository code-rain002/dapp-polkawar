var express = require("express");
var router = express.Router();
var axios = require("axios");
var multer = require("multer");
var FormData = require("form-data");
var fs = require("fs");

var ItemDao = require("../dao/item");

// Public
// GET Single item based on ID
router.get("/item/:id", async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const data = await ItemDao.getItemById(itemid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All Items based on category
router.get("/items/:category", async (req, res, next) => {
  console.log(req.params.category);
  try {
    const data = await ItemDao.getItems(req.params.category);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All Items pagination
router.get("/items/:pageIndex/:pageSize", async (req, res, next) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize);
  try {
    const data = await ItemDao.getListItems(pageIndex, pageSize);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// POST items based on category
{
  /* <character>_<weapon1id>_<weapon2id>_<armorid>_<helmetdid>_<wingid>_<mountid>.jpg */
}

router.post("/item", async (req, res, next) => {
  var armorData = [
    {
      id: 1,
      name: "Armor Archer",
      price: "150",
      currency: "PWAR",
      description: "HP: 20, MP: 15, Protection: +5",
      level: 1,
      hashImage: "QmZboN1rGU9nzwsMA5FWgcKzPvqSL1VLwmrL7jrvNSNoxz",
      category: "armor",
      properties: {
        hp: 20,
        mp: 15,
        prot: 5,
      },
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Archer",
    },
    {
      id: 2,
      name: "Armor Magician",
      price: "150",
      currency: "PWAR",
      description: "HP: 20, MP: 15, Protection: +5",
      level: 1,
      hashImage: "QmYXtV5pPfGKNec8DdLP3RhQM6fGyJ9TSVGTsVDKLNTDMF",
      category: "armor",
      properties: {
        hp: 20,
        mp: 15,
        prot: 5,
      },
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Magician",
    },
    {
      id: 3,
      name: "Armor Warrior",
      price: "150",
      currency: "PWAR",
      description: "HP: 20, MP: 15, Protection: +5",
      level: 1,
      hashImage: "QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm",
      category: "armor",
      properties: {
        hp: 20,
        mp: 15,
        prot: 5,
      },
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Warrior",
    },
    {
      id: 4,
      name: "Armor Archer",
      price: "300",
      currency: "PWAR",
      description: "HP: 250, MP: 200, Protection: +50",
      level: 2,
      hashImage: "QmXeawPHD5Gqug8gm8RNQ8xjKGxboHRu52GfBjMnJBBkgn",
      hashItem: "QmZunUGSLQs99ziJN2HxBmvNtsHTvrX7AzUhxRKkCyndZi",
      category: "armor",
      properties: {
        hp: 250,
        mp: 200,
        prot: 50,
      },
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Archer",
    },
    {
      id: 5,
      name: "Armor Magician",
      price: "300",
      currency: "PWAR",
      description: "HP: 250, MP: 200, Protection: +50",
      level: 2,
      hashImage: "QmfHwGHzL98a9W2r6MdB4pbCzCj3NkSYQ9CFmaggi1tLsk",
      hashItem: "Qmb8TZZdHtRAhxTuFCDTAL1kKyQyuiWrwb1nKPxnWkRCZP",
      category: "armor",
      properties: {
        hp: 250,
        mp: 200,
        prot: 50,
      },
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Magician",
    },
    {
      id: 6,
      name: "Armor Warrior",
      price: "300",
      currency: "PWAR",
      description: "HP: 250, MP: 200, Protection: +50",
      level: 2,
      hashImage: "QmXfuoXRaLUD1RWkzxxe6oLJGHuvGVnnGeoUfJuQ33SKc2",
      hashItem: "QmeF66tqbXL63LRPWEgM62PUuSXkdzMSRKra8p2ybo2yBK",

      category: "armor",
      properties: {
        hp: 250,
        mp: 200,
        prot: 50,
      },
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Warrior",
    },
    {
      id: 7,
      name: "Armor Archer",
      price: "600",
      currency: "PWAR",
      description: "HP: 1000, MP: 650, Protection: +200",
      properties: {
        hp: 1000,
        mp: 650,
        prot: 200,
      },
      level: 3,
      hashImage: "QmSFDevQSuPZw269NVTHANN5iyxS4MRSJ8ZDkqQYK49Ahg",
      category: "armor",

      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Archer",
    },
    {
      id: 8,
      name: "Armor Magician",
      price: "600",
      currency: "PWAR",
      description: "HP: 1000, MP: 650, Protection: +200",
      properties: {
        hp: 1000,
        mp: 650,
        prot: 200,
      },
      level: 3,
      hashImage: "QmRrvV4oFsgerbJSeXHbe5KeH81rQunsvUe1vo44SM5hPs",
      category: "armor",
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Magician",
    },
    {
      id: 9,
      name: "Armor Warrior",
      price: "600",
      currency: "PWAR",
      description: "HP: 1000, MP: 650, Protection: +200",
      properties: {
        hp: 1000,
        mp: 650,
        prot: 200,
      },
      level: 3,
      hashImage: "QmUV92tnTrFYNYwwQGSAA5AMnrBkPKcSwmg9NDmfACwstM",
      category: "armor",
      gallery: [
        "QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm",
        "QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz",
        "QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55",
      ],
      forCharacter: "Warrior",
    },
    // {
    //   name: 'Armor',
    //   price: '2.0',
    //   currency: 'PWAR',
    //   description: 'HP: 10, MP: 5, Protection: +5',
    //   level: 4,
    //   hashImage: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
    //   category: 'armor',
    //   gallery: [
    //     'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
    //     'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
    //     'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
    //   ],
    // },
    // {
    //   name: 'Armor',
    //   price: '5.0',
    //   currency: 'PWAR',
    //   description: 'HP: 10, MP: 5, Protection: +5',
    //   level: 5,
    //   hashImage: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
    //   category: 'armor',
    //   gallery: [
    //     'QmPtX8ZUs7eXy7W1SNDnwXkR4wvxvCy8cjgFSmXjzAmfVm',
    //     'QmaPoAP9dwpUZ43pSxrzhjhcENzb17DSNqVdaVsKYpTFZz',
    //     'QmehQyAK2zcuVeuJgY9GWTo4GP2hcXaaHGoehXQZD9XV55',
    //   ],
    // },
  ];
  var helmetData = [
    {
      id: 10,
      name: "Helmet Archer",
      price: "150",
      currency: "PWAR",
      description: "HP: 15, MP: 10, Protection: +4",
      properties: {
        hp: 15,
        mp: 10,
        prot: 4,
      },
      level: 1,
      hashImage: "QmQGVeyBvum2Z4Uc8W8Dna1SUB1wjmTPMth2oCarxMENyp",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Archer",
    },
    {
      id: 11,
      name: "Helmet Magician",
      price: "150",
      currency: "PWAR",
      description: "HP: 15, MP: 10, Protection: +4",
      properties: {
        hp: 15,
        mp: 10,
        prot: 4,
      },
      level: 1,
      hashImage: "QmZhcjqaUVP4wnrHMJHwURhBzeg2qgbbe9B8dhX52iroVB",
      category: "helmet",
      properties: {
        hp: 5,
        mp: 3,
        prot: 2,
      },
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Magician",
    },
    {
      id: 12,
      name: "Helmet Warrior",
      price: "150",
      currency: "PWAR",
      description: "HP: 15, MP: 10, Protection: +4",
      properties: {
        hp: 15,
        mp: 10,
        prot: 4,
      },
      level: 1,
      hashImage: "Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Warrior",
    },
    {
      id: 13,
      name: "Helmet Archer",
      price: "300",
      currency: "PWAR",
      description: "HP: 180, MP: 120, Protection: +40",
      properties: {
        hp: 180,
        mp: 120,
        prot: 40,
      },
      level: 2,
      hashImage: "QmaQyiLmhUh958VZHQuFyTUVxEbSvdPrHfZsBkyxSnjxYp",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Archer",
    },
    {
      id: 14,
      name: "Helmet Magician",
      price: "300",
      currency: "PWAR",
      description: "HP: 180, MP: 120, Protection: +40",
      properties: {
        hp: 180,
        mp: 120,
        prot: 40,
      },
      level: 2,
      hashImage: "QmRTnS99tnA7UCCNoTy2w12qwB5ktKDMdqVAKhCaBKZCc6",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Magician",
    },
    {
      id: 15,
      name: "Helmet Warrior",
      price: "300",
      currency: "PWAR",
      description: "HP: 180, MP: 120, Protection: +40",
      properties: {
        hp: 180,
        mp: 120,
        prot: 40,
      },
      level: 2,
      hashImage: "QmRT9UAzv6eoUUoBEuANYJXNCaBttkYtJ9TDzP4Eu1BNBd",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Warrior",
    },
    {
      id: 16,
      name: "Helmet Archer",
      price: "600",
      currency: "PWAR",
      description: "HP: 800, MP: 500, Protection: +150",
      properties: {
        hp: 800,
        mp: 500,
        prot: 150,
      },
      level: 3,
      hashImage: "QmUhnTKJUmwoKL4ZmxGntLXAwAgMKN5uBEGYu4ZNKG5n9d",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Archer",
    },
    {
      id: 17,
      name: "Helmet Magician",
      price: "600",
      currency: "PWAR",
      description: "HP: 800, MP: 500, Protection: +150",
      properties: {
        hp: 800,
        mp: 500,
        prot: 150,
      },
      level: 3,
      hashImage: "QmWvJSCwm2Hw6vuhBF3M1TeEx9jvBVddHWhSxsqZ6XHRA6",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Magician",
    },
    {
      id: 18,
      name: "Helmet Warrior",
      price: "800",
      currency: "PWAR",
      description: "HP: 800, MP: 500, Protection: +150",
      properties: {
        hp: 800,
        mp: 500,
        prot: 150,
      },
      level: 3,
      hashImage: "QmcArUKSiHxYNwE58nXfkq6MxMVS4XZvRSDkoQnVXmGDjg",
      category: "helmet",
      gallery: [
        "QmXFFJk8Qk5DNKoszm7AbxK39symaqu3GVEUVwcFMSkvd3",
        "QmPHf88E4uJJw4MTUni3hdBD8mzfvXiVGacX74wDii6Xb4",
        "QmT2rjE1hhmiNJuoUY4Zc4tAty49sK5wv9tfxgKQqbibWf",
      ],
      forCharacter: "Warrior",
    },
  ];
  var wingData = [
    {
      id: 19,
      name: "Wing Archer",
      price: "150",
      currency: "PWAR",
      description: "HP: 8, MP: 6, Protection: +3",
      level: 1,
      properties: {
        hp: 8,
        mp: 6,
        prot: 3,
      },
      hashImage: "QmSE1fRkifzczAYwNk3cZBvhrFgzefjxjWyjt7qguktKhX",
      category: "wing",
      forCharacter: "Archer",
    },
    {
      id: 20,
      name: "Wing Magician",
      price: "150",
      currency: "PWAR",
      description: "HP: 8, MP: 6, Protection: +3",
      level: 1,
      properties: {
        hp: 8,
        mp: 6,
        prot: 3,
      },

      hashImage: "QmSwZWV1fbUUPmHPidAkxqNbxtsXi6jPMdN4AeV3euDdVE",
      category: "wing",
      forCharacter: "Magician",
    },
    {
      id: 21,
      name: "Wing Warrior",
      price: "150",
      currency: "PWAR",
      description: "HP: 8, MP: 6, Protection: +3",
      level: 1,
      properties: {
        hp: 8,
        mp: 6,
        prot: 3,
      },
      level: 1,
      hashImage: "QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua",
      category: "wing",
      forCharacter: "Warrior",
    },
    {
      id: 22,
      name: "Wing Archer",
      price: "300",
      currency: "PWAR",
      description: "HP: 150, MP: 100, Protection: +25",
      properties: {
        hp: 150,
        mp: 100,
        prot: 25,
      },
      level: 2,
      hashImage: "QmPL5vbbDfZ6qQtCbovu2kGUCu2aBdDTPg8fRMdBr5s3a2",
      category: "wing",
      forCharacter: "Archer",
    },
    {
      id: 23,
      name: "Wing Magician",
      price: "300",
      currency: "PWAR",
      description: "HP: 150, MP: 100, Protection: +25",
      properties: {
        hp: 150,
        mp: 100,
        prot: 25,
      },
      level: 2,
      hashImage: "QmU7fjfNU5QGyVwwyoerAWjFvBHJdnb26tefzkvxtq1yru",
      category: "wing",
      forCharacter: "Magician",
    },
    {
      id: 24,
      name: "Wing Warrior",
      price: "0.2",
      currency: "PWAR",
      description: "HP: 150, MP: 100, Protection: +25",
      properties: {
        hp: 150,
        mp: 100,
        prot: 25,
      },
      level: 2,
      hashImage: "QmdYwnAbxZDCP5fRCqcHB6BA3qrkSfFnKPG2JkCPibzXjM",
      category: "wing",
      forCharacter: "Warrior",
    },
    {
      id: 25,
      name: "Wing Archer",
      price: "600",
      currency: "PWAR",
      description: "HP: 150, MP: 100, Protection: +25",
      properties: {
        hp: 650,
        mp: 400,
        prot: 120,
      },
      level: 3,
      hashImage: "QmThgWZpEiXvyatNk6ALXwR7emCApuDKgBaefFsYtbQZwF",
      category: "wing",
      forCharacter: "Archer",
    },
    {
      id: 26,
      name: "Wing Magician",
      price: "600",
      currency: "PWAR",
      description: "HP: 150, MP: 100, Protection: +25",
      properties: {
        hp: 650,
        mp: 400,
        prot: 120,
      },
      level: 3,
      hashImage: "QmUZ3NNE4TANsGnCgv8rFMTGU9A1npV3odLDki8HBdAfSR",
      category: "wing",
      forCharacter: "Magician",
    },
    {
      id: 27,
      name: "Wing Warrior",
      price: "600",
      currency: "PWAR",
      description: "HP: 150, MP: 100, Protection: +25",
      properties: {
        hp: 650,
        mp: 400,
        prot: 120,
      },
      level: 3,
      hashImage: "QmXcHaJGDKYR7NneL8vhNuLAfqBgzqek3ug1F2HREFm5zv",
      category: "wing",
      forCharacter: "Warrior",
    },
  ];
  var mountData = [
    {
      id: 28,
      name: "Mount",
      price: "2000",
      currency: "PWAR",
      description:
        "Base Damage: 500, Energy: 10,000, Bonus: +15%, Downer: 1000,  Accuracy: 200",
      level: 1,
      properties: {
        bDam: 500,
        energy: 10000,
        bonus: 15,
        downer: 1000,
        accuracy: 200,
      },
      hashImage: "QmZx9cXWSCt1s2tPvdyjvM1YVTHin2po1DuWQWwQMwupwc",
      category: "magic vase",
      forCharacter: "All",
    },
  ];
  var swordData = [
    {
      id: 29,
      name: "Sword",
      price: "200",
      currency: "PWAR",
      description: "Base Damage: 7, Accuracy: +5, Bonus: +7%",
      properties: {
        bDam: 7,
        accuracy: 5,
        bonus: 7,
      },
      level: 1,
      hashImage: "QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE",
      category: "sword",
      gallery: [
        "QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu",
        "QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4",
        "QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X",
      ],
      forCharacter: "Warrior",
    },
    {
      id: 30,
      name: "Sword",
      price: "500",
      currency: "PWAR",
      description: "Base Damage: 50, Accuracy: +40, Bonus: +10%",
      properties: {
        bDam: 50,
        accuracy: 40,
        bonus: 10,
      },
      hashItem: "QmeTsCqR4fRRbn8u5m5fTce3eymJK6HKXbnrXvh7pk3Ygn",
      level: 2,
      hashImage: "QmVupdRtr5PY7m8G3fWaKJCbk9MAZjq41jPeG87beZhxmm",
      category: "sword",
      gallery: [
        "QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu",
        "QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4",
        "QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X",
      ],
      forCharacter: "Warrior",
    },
    {
      id: 31,
      name: "Sword",
      price: "1000",
      currency: "PWAR",
      description: "Base Damage: 215, Accuracy: +150, Bonus: +15%",
      properties: {
        bDam: 215,
        accuracy: 150,
        bonus: 15,
      },
      hashItem: "QmXrpvBfbyZpKEMpw3jSbMbaAH56guZim2FbyvZ8x1M4MP",
      level: 3,
      hashImage: "QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5",
      category: "sword",
      gallery: [
        "QmV5ePoHh2XGzPmhxy5b3NGriauCfHqxoT7M2pLSWzujVu",
        "QmWo1CTuCVie2N8EKhFaBXA5FUP9Luj1sjJBZLUyy8ssb4",
        "QmeeG3xVTnGt19hVcZcfruw15aWSGohPudebX8U7nNez9X",
      ],
      forCharacter: "Warrior",
    },
  ];
  var knifeData = [
    {
      id: 32,
      name: "Big Knife",
      price: "200",
      currency: "PWAR",
      description: "Base Damage: 8, Accuracy: +4, Bonus: +5%",
      properties: {
        bDam: 8,
        accuracy: 4,
        bonus: 5,
      },
      level: 1,
      hashImage: "QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs",
      category: "big knife",
      forCharacter: "Warrior",
    },
    {
      id: 33,
      name: "Big Knife",
      price: "500",
      currency: "PWAR",
      description: "Base Damage: 55, Accuracy: +36, Bonus: +8%",
      properties: {
        bDam: 55,
        accuracy: 36,
        bonus: 8,
      },
      hashItem: "QmRRKhXes5gK6T3eViVUfnrpFSzNTs92KC2CVAVUGQ9P2r",
      level: 2,
      hashImage: "QmUWAe5NESavd4DntzoBn4UPtStikSMPi1EkioWzjVkqpG",
      category: "big knife",
      forCharacter: "Warrior",
    },
    {
      id: 34,
      name: "Big Knife",
      price: "1000",
      currency: "PWAR",
      description: "Base Damage: 225, Accuracy: +125, Bonus: +13%",
      properties: {
        bDam: 225,
        accuracy: 125,
        bonus: 13,
      },
      hashItem: "QmTSCJHiCrxUC57jKqkVNtMBoTLRmwVz1ZZRdUNauq2269",
      level: 3,
      hashImage: "Qmb69r56kXY4Z6w3ZJUuu7qSyNZYhdfLVPjckzhmKgQihB",
      category: "big knife",
      forCharacter: "Warrior",
    },
  ];
  var tessenData = [
    {
      id: 35,
      name: "Tessen",
      price: "200",
      currency: "PWAR",
      description: "Base Damage: 4, Accuracy: +4, Bonus: +8%",
      properties: {
        bDam: 4,
        accuracy: 5,
        bonus: 8,
      },
      level: 1,
      hashImage: "QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n",
      category: "tessen",
      forCharacter: "Warrior",
    },
    {
      id: 36,
      name: "Tessen",
      price: "500",
      currency: "PWAR",
      description: "Base Damage: 40, Accuracy: +39, Bonus: +12%",
      properties: {
        bDam: 40,
        accuracy: 39,
        bonus: 12,
      },
      hashItem: "QmQasK9t7bbJQAZX3ZkepfYvs71KP6bBXJiS6e4MXWofEc",
      level: 2,
      hashImage: "QmQ1u85w75z51hgX5Bd1vxEtKMTJCYXbetfTAp1PqXGPVs",
      category: "tessen",
      forCharacter: "Warrior",
    },
    {
      id: 37,
      name: "Tessen",
      price: "1000",
      currency: "PWAR",
      description: "Base Damage: 180, Accuracy: +145, Bonus: +17%",
      properties: {
        bDam: 180,
        accuracy: 145,
        bonus: 17,
      },
      hashItem: "QmcUXvqHqZ13gjzpw6LcwEJ1XPzFZKJhtHYFDMPNVoaDfa",
      level: 3,
      hashImage: "Qmd8HcuLGaJ8t2v77hhYNFpVgPHniDKiwTE6FwZzyjEURm",
      category: "tessen",
      forCharacter: "Warrior",
    },
  ];
  var bowData = [
    {
      id: 38,
      name: "Bow",
      price: "200",
      currency: "PWAR",
      description: "Base Damage: 5, Accuracy: +5, Bonus: +7%",
      properties: {
        bDam: 5,
        accuracy: 5,
        bonus: 7,
      },
      level: 1,
      hashImage: "QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd",
      category: "bow & arrow",
      gallery: [
        "QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg",
        "QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX",
        "QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR",
      ],
      forCharacter: "Archer",
    },
    {
      id: 39,
      name: "Bow",
      price: "500",
      currency: "PWAR",
      description: "Base Damage: 45, Accuracy: +40, Bonus: +10%",
      properties: {
        bDam: 45,
        accuracy: 40,
        bonus: 10,
      },
      hashItem: "Qmc9gjzN3JmeJQEAsuWZVuhkXu4xyML3p4ho1HTA4RAxN3",
      level: 2,
      hashImage: "QmSsT2CTrFzGrsi7NHLZC8JmSf6VFYXtFudyHbh2sCKW2K",
      category: "bow & arrow",
      gallery: [
        "QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg",
        "QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX",
        "QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR",
      ],
      forCharacter: "Archer",
    },
    {
      id: 40,
      name: "Bow",
      price: "1000",
      currency: "PWAR",
      description: "Base Damage: 190, Accuracy: +160, Bonus: +14%",
      properties: {
        bDam: 45,
        accuracy: 40,
        bonus: 10,
      },
      hashItem: "QmPdQnpA861SN3fLz1QLCAvGU1r2ehRvUvFXNgPnhrH7BU",
      level: 3,
      hashImage: "QmXhj7e9X3SYRegodCWPDqWo5wvHeCFCELr7bWgvKQxcBR",
      category: "bow & arrow",
      gallery: [
        "QmVYVp3RhTL2BgdLg4CPejuxPDcMRjiWv6f218vPZa4xYg",
        "QmYu9frvTRuySJYupkYthz77fMH9dg1ugiri4fHUuuGRTX",
        "QmPQwFLd5YukQUqF7RGxTvaJQUGemqKqH9mYVea5uETmNR",
      ],
      forCharacter: "Archer",
    },
  ];
  var gunData = [
    {
      id: 41,
      name: "Gun",
      price: "200",
      currency: "PWAR",
      description: "Base Damage: 8, Accuracy: +3, Bonus: +5%",
      properties: {
        bDam: 8,
        accuracy: 3,
        bonus: 5,
      },
      level: 1,
      hashImage: "QmWAdCmcPVhryxHMcgSKcHa88B5S8rhNCYLTDmKKg33iU4",
      category: "gun",
      forCharacter: "Archer",
    },
    {
      id: 42,
      name: "Gun",
      price: "500",
      currency: "PWAR",
      description: "Base Damage: 60, Accuracy: +25, Bonus: +8%",
      properties: {
        bDam: 60,
        accuracy: 25,
        bonus: 8,
      },
      hashItem: "QmZ6EBCS42JdnG339yuPMKJSGJeoLogPBBdwGEGqkUnHcP",
      level: 2,
      hashImage: "QmPp1AoDJy3PdCpCb24aLEvEygPGD9hq5M41BBb2XKmnBS",
      category: "gun",
      forCharacter: "Archer",
    },
    {
      id: 43,
      name: "Gun",
      price: "1000",
      currency: "PWAR",
      description: "Base Damage: 250, Accuracy: +90, Bonus: +12%",
      properties: {
        bDam: 250,
        accuracy: 90,
        bonus: 12,
      },
      hashItem: "Qmbqsk52iA6pB8rNBEars7jQKFgzXygoRE14kkxFZZX9p2",
      level: 3,
      hashImage: "QmPgyQnuzXdLzWHJ9J21HSPF3oBjtAZXtS7jLvVRu7NBGv",
      category: "gun",
      forCharacter: "Archer",
    },
  ];

  var sceptreData = [
    {
      id: 44,
      name: "Sceptre",
      price: "200",
      currency: "PWAR",
      description: "Base Damage: 6, Accuracy: +3, Bonus: +4%",
      properties: {
        bDam: 6,
        accuracy: 3,
        bonus: 4,
      },
      level: 1,
      hashImage: "QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD",
      category: "sceptre",
      gallery: [
        "QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee",
        "QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV",
        "QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav",
      ],
      forCharacter: "Magician",
    },
    {
      id: 45,
      name: "Sceptre",
      price: "500",
      currency: "PWAR",
      description: "Base Damage: 48, Accuracy: +25, Bonus: +7%",
      properties: {
        bDam: 28,
        accuracy: 25,
        bonus: 7,
      },
      hashItem: "QmXpxRb6Ja3Yc1f3ENktQNQH6MA82zRBeFuvCcZCKKa33H",
      level: 2,
      hashImage: "QmVdKqA9HoKFZg3PL7uLAZVUSxu4iP6MkiYz539UyH3SjC",
      category: "sceptre",
      gallery: [
        "QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee",
        "QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV",
        "QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav",
      ],
      forCharacter: "Magician",
    },

    {
      id: 46,
      name: "Sceptre",
      price: "1000",
      currency: "PWAR",
      description: "Base Damage: 210, Accuracy: +90, Bonus: +11%",
      properties: {
        bDam: 210,
        accuracy: 90,
        bonus: 11,
      },
      level: 3,
      hashImage: "QmYXKooL4KvF6C6rTRvR1DaGLxcgScP2cg5gm1mPWHrM2b",
      category: "sceptre",
      gallery: [
        "QmbQuSokDVyFgdFYa58kgviw7GWZjHXxJiyXcryY74EUee",
        "QmfRkN8ZqNRgVqugfNvHhBEfznzAhKkYDwnrKuXMRcTjyV",
        "QmYLW8udGSi1q6S2oFTnq8giiCcELDQoED8JmJUURyazav",
      ],
      forCharacter: "Magician",
    },
  ];
  var magicvaseData = [
    {
      id: 47,
      name: "Magic Vase",
      price: "200",
      currency: "PWAR",
      description: "Base Damage: 2, Accuracy: +1, Bonus: +2%",
      properties: {
        bDam: 2,
        accuracy: 1,
        bonus: 2,
      },
      level: 1,
      hashImage: "QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA",
      category: "magic vase",
      gallery: [
        "QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2",
        "QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x",
        "QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3",
        "QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8",
      ],
      forCharacter: "Magician",
    },
    {
      id: 48,
      name: "Magic Vase",
      price: "500",
      currency: "PWAR",
      description: "Base Damage: 12, Accuracy: +5, Bonus: +3%",
      properties: {
        bDam: 12,
        accuracy: 5,
        bonus: 3,
      },
      hashItem: "QmQHRGeJWv9NQaB1HVG1K3MN7FoRrqJdRoaHQH33P4DAfU",
      level: 2,
      hashImage: "QmasX15NK3jhUyq2iFppDZWCuAd9bJXWruDPY67eNFXTkd",
      category: "magic vase",
      gallery: [
        "QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2",
        "QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x",
        "QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3",
        "QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8",
      ],
      forCharacter: "Magician",
    },
    {
      id: 49,
      name: "Magic Vase",
      price: "1000",
      currency: "PWAR",
      description: "Base Damage: 40, Accuracy: +20, Bonus: +4%",
      properties: {
        bDam: 40,
        accuracy: 20,
        bonus: 4,
      },
      level: 3,
      hashImage: "QmR4JYoUmGWQdVUgwggr4V8NBrVRC5CMVdKuhuFLPMDh7u",
      category: "magic vase",
      gallery: [
        "QmUZBnrGcr89g4jFE3yvjFyjRSnZGiNUGLSx3bgLRcvwd2",
        "QmTGSFsdAbKi4EspTWHVAjBCf8KomKZFF3HzoiDXRsmk5x",
        "QmapZSPXv5vzbvjNa1T191SPzA9Zo2ufZ4JEQtVi3pCSS3",
        "QmNc3mNzvHoxd12XK4pXtRqZARJrrNPouSfhRMyX5Cief8",
      ],
      forCharacter: "Magician",
    },
  ];
  try {
    const data = await ItemDao.createItem([
      ...armorData,
      ...helmetData,
      ...wingData,
      ...mountData,
      ...gunData,
      ...swordData,
      ...bowData,
      ...sceptreData,
      ...knifeData,
      ...tessenData,
      ...magicvaseData,
    ]);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// DELETE items based on category
router.delete("/item", async (req, res, next) => {
  try {
    const data = await ItemDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});
module.exports = router;
