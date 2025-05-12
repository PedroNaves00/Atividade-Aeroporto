const express = require('express');
const router = express.Router();
const PassageiroController = require('../controllers/PassageiroController');

router.post('/', PassageiroController.criar);
router.get('/', PassageiroController.listar);
router.get('/:id', PassageiroController.buscarPorId);
router.put('/:id', PassageiroController.atualizar);
router.delete('/:id', PassageiroController.deletar);
router.patch('/:id/check-in', PassageiroController.atualizarCheckIn);

module.exports = router; 