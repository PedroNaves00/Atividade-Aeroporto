const Passageiro = require('../models/Passageiro');

class PassageiroController {
    async criar(req, res) {
        try {
            const passageiro = await Passageiro.create(req.body);
            return res.status(201).json(passageiro);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const passageiros = await Passageiro.find().populate('voo');
            return res.json(passageiros);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const passageiro = await Passageiro.findById(req.params.id).populate('voo');
            if (!passageiro) {
                return res.status(404).json({ error: 'Passageiro não encontrado' });
            }
            return res.json(passageiro);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const passageiro = await Passageiro.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!passageiro) {
                return res.status(404).json({ error: 'Passageiro não encontrado' });
            }
            return res.json(passageiro);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const passageiro = await Passageiro.findByIdAndDelete(req.params.id);
            if (!passageiro) {
                return res.status(404).json({ error: 'Passageiro não encontrado' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizarCheckIn(req, res) {
        try {
            const passageiro = await Passageiro.findByIdAndUpdate(
                req.params.id,
                { checkIn: true },
                { new: true }
            );
            if (!passageiro) {
                return res.status(404).json({ error: 'Passageiro não encontrado' });
            }
            return res.json(passageiro);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new PassageiroController();