class VooRepository {
    constructor() {
        this.voos = [];
    }

    findAll() {
        return this.voos;
    }

    findByNumero(numeroVoo) {
        return this.voos.find(v => v.numeroVoo === numeroVoo);
    }

    save(voo) {
        this.voos.push(voo);
        return voo;
    }

    update(numeroVoo, vooData) {
        const index = this.voos.findIndex(v => v.numeroVoo === numeroVoo);
        if (index !== -1) {
            this.voos[index] = { ...this.voos[index], ...vooData };
            return this.voos[index];
        }
        return null;
    }

    delete(numeroVoo) {
        this.voos = this.voos.filter(v => v.numeroVoo !== numeroVoo);
    }

    findByDateRange(inicio, fim) {
        return this.voos.filter(v => {
            return v.dataHoraPartida >= inicio && v.dataHoraPartida <= fim;
        });
    }

    findByPortao(numeroPortao) {
        return this.voos.filter(v => v.portaoNumero === numeroPortao);
    }
}

module.exports = new VooRepository();