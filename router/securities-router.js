'use strict';
require('dotenv').config();
const express = require('express');
const { AppDataSource } = require('../src/data-source');
const router = express.Router();
const userRepository = AppDataSource.getRepository('User');
const roleRepository = AppDataSource.getRepository('Role');
const checkNotAuthenticated = require('../src/utils/check-not-authenticated');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/login', checkNotAuthenticated, async (request, response) => {
  response.render('pages/security/login');
});

router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/security/login',
    failureFlash: true,
  })
);

router.delete('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, phone, password, roleId } = req.body;
  try {
    const role = await roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await userRepository.save(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
