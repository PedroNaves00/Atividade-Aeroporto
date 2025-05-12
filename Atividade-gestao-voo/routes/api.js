const express = require('express');
const router = express.Router();
const PassageiroController = require('../controllers/PassageiroController');
const VooController = require('../controllers/VooController');
const PortaoController = require('../controllers/PortaoController');
const RelatorioController = require('../controllers/RelatorioController');

// Rotas de Passageiro
router.get('/passageiros', PassageiroController.findAll);
router.get('/passageiros/:id', PassageiroController.findById);
router.post('/passageiros', PassageiroController.create);
router.put('/passageiros/:id', PassageiroController.update);
router.delete('/passageiros/:id', PassageiroController.delete);
router.patch('/passageiros/:id/checkin', PassageiroController.updateCheckIn);

// Rotas de Voo
router.get('/voos', VooController.findAll);
router.get('/voos/:numeroVoo', VooController.findById);
router.post('/voos', VooController.create);
router.put('/voos/:numeroVoo', VooController.update);
router.delete('/voos/:numeroVoo', VooController.delete);
router.patch('/voos/:numeroVoo/status', VooController.updateStatus);
router.patch('/voos/:numeroVoo/portao', VooController.atribuirPortao);
router.get('/voos/hoje', VooController.voosDoDia);

// Rotas de Portão
router.get('/portoes', PortaoController.findAll);
router.get('/portoes/:numero', PortaoController.findById);
router.post('/portoes', PortaoController.create);
router.put('/portoes/:numero', PortaoController.update);
router.delete('/portoes/:numero', PortaoController.delete);

// Relatórios
router.get('/relatorios/diario', RelatorioController.relatorioDiario);

module.exports = router;