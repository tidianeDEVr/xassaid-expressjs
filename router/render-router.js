'use strict';
require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const checkAuthenticated = require('../src/utils/check-authenticated');

router.get('/', checkAuthenticated, async (request, response) => {
  const overview = {
    audiosCount: 5,
    filesCount: 5,
    podcastsCount: 5,
    articlesCount: 5,
  };
  response.render('pages/dashboard', {
    overview,
  });
});

router.get('/audios', async (request, response) => {
  response.render('pages/audios');
});

router.post('/audios', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Aucun fichier téléchargé.');
  }
  let uploadedFile = req.files.audioFile;
  let folder = '';
  if (uploadedFile.mimetype.startsWith('image')) {
    folder = 'uploads/images';
  } else if (uploadedFile.mimetype.startsWith('audio')) {
    folder = 'uploads/audios';
  } else {
    return res.status(400).send('Type de fichier non pris en charge.');
  }
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  const uploadPath = path.join(__dirname, folder, uploadedFile.name);
  uploadedFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send('Fichier téléchargé avec succès');
  });
});

router.get('/podcasts', async (request, response) => {
  response.render('pages/podcasts');
});

router.get('/users', async (request, response) => {
  response.render('pages/users');
});

router.get('/library', async (request, response) => {
  response.render('pages/library');
});

router.get('/articles', async (request, response) => {
  response.render('pages/articles');
});

module.exports = router;
