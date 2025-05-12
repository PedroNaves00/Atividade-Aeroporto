const Voo = require('../models/Voo');
const Portao = require('../models/Portao');

class VooController {
    async criar(req, res) {
        try {
            const voo = await Voo.create(req.body);
            return res.status(201).json(voo);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const voos = await Voo.find().populate('portao');
            return res.json(voos);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const voo = await Voo.findById(req.params.id).populate('portao');
            if (!voo) {
                return res.status(404).json({ error: 'Voo não encontrado' });
            }
            return res.json(voo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const voo = await Voo.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!voo) {
                return res.status(404).json({ error: 'Voo não encontrado' });
            }
            return res.json(voo);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const voo = await Voo.findByIdAndDelete(req.params.id);
            if (!voo) {
                return res.status(404).json({ error: 'Voo não encontrado' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async atualizarStatus(req, res) {
        try {
            const { status } = req.body;
            const voo = await Voo.findById(req.params.id);
            
            if (!voo) {
                return res.status(404).json({ error: 'Voo não encontrado' });
            }

            voo.status = status;
            
            // Se o voo for concluído, liberar o portão
            if (status === 'CONCLUIDO' && voo.portao) {
                await Portao.findByIdAndUpdate(voo.portao, { disponivel: true });
                voo.portao = null;
            }

            await voo.save();
            return res.json(voo);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async atribuirPortao(req, res) {
        try {
            const { portaoId } = req.body;
            const voo = await Voo.findById(req.params.id);
            const portao = await Portao.findById(portaoId);

            if (!voo) {
                return res.status(404).json({ error: 'Voo não encontrado' });
            }

            if (!portao) {
                return res.status(404).json({ error: 'Portão não encontrado' });
            }

            if (!portao.disponivel) {
                return res.status(400).json({ error: 'Portão não está disponível' });
            }

            voo.portao = portaoId;
            portao.disponivel = false;

            await Promise.all([voo.save(), portao.save()]);
            return res.json(voo);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new VooController();