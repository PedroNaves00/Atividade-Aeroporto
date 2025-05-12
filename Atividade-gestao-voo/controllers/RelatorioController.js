const Voo = require('../models/Voo');
const Passageiro = require('../models/Passageiro');

class RelatorioController {
    async relatorioDiario(req, res) {
        try {
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const amanha = new Date(hoje);
            amanha.setDate(amanha.getDate() + 1);

            console.log('Buscando voos entre:', hoje, 'e', amanha);

            const voos = await Voo.find({
                dataHora: {
                    $gte: hoje,
                    $lt: amanha
                }
            }).populate('portao');

            console.log('Voos encontrados:', voos.length);

            const relatorio = await Promise.all(voos.map(async (voo) => {
                const passageiros = await Passageiro.find({ voo: voo._id });
                console.log(`Passageiros encontrados para o voo ${voo.numero}:`, passageiros.length);
                
                return {
                    voo: {
                        numero: voo.numero,
                        origem: voo.origem,
                        destino: voo.destino,
                        dataHora: voo.dataHora,
                        status: voo.status,
                        portao: voo.portao ? voo.portao.numero : null
                    },
                    passageiros: passageiros.map(p => ({
                        nome: p.nome,
                        cpf: p.cpf,
                        checkIn: p.checkIn
                    }))
                };
            }));

            console.log('Relatório gerado com sucesso');
            return res.json(relatorio);
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new RelatorioController();