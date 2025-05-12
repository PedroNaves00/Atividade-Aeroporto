class PassageiroRepository {
    constructor() {
        this.passageiros = [];
    }

    findAll() {
        return this.passageiros;
    }

    findById(id) {
        return this.passageiros.find(p => p.id === id);
    }

    save(passageiro) {
        this.passageiros.push(passageiro);
        return passageiro;
    }

    update(id, passageiroData) {
        const index = this.passageiros.findIndex(p => p.id === id);
        if (index !== -1) {
            this.passageiros[index] = { ...this.passageiros[index], ...passageiroData };
            return this.passageiros[index];
        }
        return null;
    }

    delete(id) {
        this.passageiros = this.passageiros.filter(p => p.id !== id);
    }

    findByVooId(vooId) {
        return this.passageiros.filter(p => p.vooId === vooId);
    }
}

module.exports = new PassageiroRepository();