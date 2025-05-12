const mongoose = require('mongoose');

const vooSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
        unique: true
    },
    origem: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    dataHora: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['AGENDADO', 'EMBARQUE', 'EM_VOO', 'CONCLUIDO', 'CANCELADO'],
        default: 'AGENDADO'
    },
    portao: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portao'
    }
}, { timestamps: true });

module.exports = mongoose.model('Voo', vooSchema);