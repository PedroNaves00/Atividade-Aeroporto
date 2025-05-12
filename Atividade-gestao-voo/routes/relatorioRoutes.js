const express = require('express');
const router = express.Router();
const RelatorioController = require('../controllers/RelatorioController');

router.get('/diario', RelatorioController.relatorioDiario);

module.exports = router; 