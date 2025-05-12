const PassageiroRepository = require('../repositories/PassageiroRepository');
const VooRepository = require('../repositories/VooRepository');

class PassageiroService {
    constructor() {
        this.repository = PassageiroRepository;
        this.vooRepository = VooRepository;
    }

    findAll() {
        return this.repository.findAll();
    }

    findById(id) {
        return this.repository.findById(id);
    }

    create(passageiroData) {
        // Verifica se o voo existe
        const voo = this.vooRepository.findById(passageiroData.vooId);
        if (!voo) {
            throw new Error('Voo não encontrado');
        }

        return this.repository.save(new Passageiro(passageiroData));
    }

    update(id, passageiroData) {
        return this.repository.update(id, passageiroData);
    }

    delete(id) {
        return this.repository.delete(id);
    }

    updateStatusCheckIn(id, status) {
        const passageiro = this.repository.findById(id);
        if (!passageiro) {
            throw new Error('Passageiro não encontrado');
        }

        passageiro.statusCheckIn = status;
        return this.repository.update(id, passageiro);
    }
}

module.exports = new PassageiroService();