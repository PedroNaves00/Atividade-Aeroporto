const express = require('express');
const router = express.Router();
const VooController = require('../controllers/VooController');

router.post('/', VooController.criar);
router.get('/', VooController.listar);
router.get('/:id', VooController.buscarPorId);
router.put('/:id', VooController.atualizar);
router.delete('/:id', VooController.deletar);
router.patch('/:id/status', VooController.atualizarStatus);
router.patch('/:id/portao', VooController.atribuirPortao);

module.exports = router; 