const express = require('express');
const router = express.Router();
const PortaoController = require('../controllers/PortaoController');

router.post('/', PortaoController.criar);
router.get('/', PortaoController.listar);
router.get('/:id', PortaoController.buscarPorId);
router.put('/:id', PortaoController.atualizar);
router.delete('/:id', PortaoController.deletar);

module.exports = router; 