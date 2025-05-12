const Portao = require('../models/Portao');

class PortaoController {
    async criar(req, res) {
        try {
            const portao = await Portao.create(req.body);
            return res.status(201).json(portao);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const portoes = await Portao.find();
            return res.json(portoes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const portao = await Portao.findById(req.params.id);
            if (!portao) {
                return res.status(404).json({ error: 'Portão não encontrado' });
            }
            return res.json(portao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const portao = await Portao.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!portao) {
                return res.status(404).json({ error: 'Portão não encontrado' });
            }
            return res.json(portao);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const portao = await Portao.findByIdAndDelete(req.params.id);
            if (!portao) {
                return res.status(404).json({ error: 'Portão não encontrado' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PortaoController();