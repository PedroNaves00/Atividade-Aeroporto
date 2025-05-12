class PortaoRepository {
    constructor() {
        this.portoes = [];
    }

    // Adiciona um novo portão
    adicionarPortao(portao) {
        this.portoes.push(portao);
    }

    // Retorna todos os portões
    listarPortoes() {
        return this.portoes;
    }

    // Busca um portão pelo ID
    buscarPortaoPorId(id) {
        return this.portoes.find(portao => portao.id === id);
    }

    // Atualiza um portão pelo ID
    atualizarPortao(id, dadosAtualizados) {
        const index = this.portoes.findIndex(portao => portao.id === id);
        if (index !== -1) {
            this.portoes[index] = { ...this.portoes[index], ...dadosAtualizados };
            return this.portoes[index];
        }
        return null;
    }

    // Remove um portão pelo ID
    removerPortao(id) {
        const index = this.portoes.findIndex(portao => portao.id === id);
        if (index !== -1) {
            return this.portoes.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = PortaoRepository;