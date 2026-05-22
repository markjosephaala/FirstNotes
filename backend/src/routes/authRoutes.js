const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registro', authController.registro);
router.post('/login', authController.login);
router.put('/usuario/:id', authController.actualizarUsername)

module.exports = router;