var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');
var FormData = require('form-data');
var fs = require('fs');

var CategoryDao = require('../dao/category');

// GET all categories
router.get('/categories', async (req, res, next) => {
  try {
    const data = await CategoryDao.getCategories();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// POST create new user based on details
router.post('/category', async (req, res, next) => {
  let categoryData = [
    { name: 'armor' },
    { name: 'bow and arrow' },
    { name: 'helmet' },
    { name: 'gun' },
    { name: 'knife' },
    { name: 'magic vase' },
    { name: 'sword' },
    { name: 'tessen' },
    { name: 'sceptre' },
    { name: 'wing' },
  ];

  try {
    const data = await CategoryDao.createCategory(categoryData);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// DELETE create new user based on details
router.delete('/category', async (req, res, next) => {
  try {
    const data = await CategoryDao.deleteCategory();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});
module.exports = router;
