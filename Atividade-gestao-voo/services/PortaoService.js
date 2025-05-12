const PortaoRepository = require('../repositories/PortaoRepository');
const VooRepository = require('../repositories/VooRepository');
const Portao = require('../models/Portao');

class PortaoService {
    constructor() {
        this.repository = PortaoRepository;
        this.vooRepository = VooRepository;
    }

    findAll() {
        return this.repository.findAll();
    }

    findByNumero(numero) {
        return this.repository.findByNumero(numero);
    }

    create({ numero }) {
        const portaoExistente = this.repository.findByNumero(numero);
        if (portaoExistente) {
            throw new Error('Portão já existe');
        }
        
        return this.repository.save(new Portao(numero));
    }

    update(numero, portaoData) {
        return this.repository.update(numero, portaoData);
    }

    delete(numero) {
        // Verificar se o portão está em uso
        const voos = this.vooRepository.findByPortao(numero);
        if (voos.length > 0) {
            throw new Error('Portão está em uso por um voo');
        }
        
        return this.repository.delete(numero);
    }

    listarDisponiveis() {
        return this.repository.findByDisponibilidade(true);
    }
}

module.exports = new PortaoService();