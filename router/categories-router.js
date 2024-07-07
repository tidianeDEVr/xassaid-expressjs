'use strict';
require('dotenv').config();

const express = require('express');
const router = express.Router();

router.get('/audios', async (request, response) => {
  response.render('pages/categories/audios');
});

router.get('/articles', async (request, response) => {
  response.render('pages/categories/articles');
});

module.exports = router;
