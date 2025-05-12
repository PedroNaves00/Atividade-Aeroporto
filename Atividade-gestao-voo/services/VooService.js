const VooRepository = require('../repositories/VooRepository');
const PortaoRepository = require('../repositories/PortaoRepository');
const PassageiroRepository = require('../repositories/PassageiroRepository');
const Voo = require('../models/voo');

class VooService {
    constructor() {
        this.repository = VooRepository;
        this.portaoRepository = PortaoRepository;
        this.passageiroRepository = PassageiroRepository;
    }

    findAll() {
        return this.repository.findAll();
    }

    findByNumero(numeroVoo) {
        return this.repository.findByNumero(numeroVoo);
    }

    create(vooData) {
        // Validação básica
        if (new Date(vooData.dataHoraPartida) > new Date(vooData.dataHoraChegada)) {
            throw new Error('Data de partida não pode ser após a data de chegada');
        }

        const vooExistente = this.repository.findByNumero(vooData.numeroVoo);
        if (vooExistente) {
            throw new Error('Voo já existe');
        }

        return this.repository.save(new Voo(vooData));
    }

    update(numeroVoo, vooData) {
        return this.repository.update(numeroVoo, vooData);
    }

    delete(numeroVoo) {
        // Verificar se há passageiros associados
        const passageiros = this.passageiroRepository.findByVooId(numeroVoo);
        if (passageiros.length > 0) {
            throw new Error('Não é possível excluir voo com passageiros associados');
        }
        
        return this.repository.delete(numeroVoo);
    }

    updateStatus(numeroVoo, status) {
        const voo = this.repository.findByNumero(numeroVoo);
        if (!voo) {
            throw new Error('Voo não encontrado');
        }

        voo.status = status;
        
        // Liberar portão se voo concluído
        if (status === 'CONCLUIDO' && voo.portaoNumero) {
            const portao = this.portaoRepository.findByNumero(voo.portaoNumero);
            if (portao) {
                portao.disponivel = true;
                this.portaoRepository.update(portao.numero, portao);
            }
        }

        return this.repository.update(numeroVoo, voo);
    }

    atribuirPortao(numeroVoo, numeroPortao) {
        const voo = this.repository.findByNumero(numeroVoo);
        if (!voo) {
            throw new Error('Voo não encontrado');
        }

        const portao = this.portaoRepository.findByNumero(numeroPortao);
        if (!portao) {
            throw new Error('Portão não encontrado');
        }

        if (!portao.disponivel) {
            throw new Error('Portão já está ocupado');
        }

        // Liberar portão anterior se existir
        if (voo.portaoNumero) {
            const portaoAnterior = this.portaoRepository.findByNumero(voo.portaoNumero);
            if (portaoAnterior) {
                portaoAnterior.disponivel = true;
                this.portaoRepository.update(portaoAnterior.numero, portaoAnterior);
            }
        }

        // Atribuir novo portão
        portao.disponivel = false;
        this.portaoRepository.update(portao.numero, portao);
        
        voo.portaoNumero = portao.numero;
        return this.repository.update(numeroVoo, voo);
    }

    findByDateRange(inicio, fim) {
        return this.repository.findByDateRange(inicio, fim);
    }

    voosDoDia() {
        const hoje = new Date();
        const inicioDia = new Date(hoje.setHours(0, 0, 0, 0));
        const fimDia = new Date(hoje.setHours(23, 59, 59, 999));
        
        return this.repository.findByDateRange(inicioDia, fimDia);
    }
}

module.exports = new VooService();