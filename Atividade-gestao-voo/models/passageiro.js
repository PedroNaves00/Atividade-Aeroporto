const mongoose = require('mongoose');

const passageiroSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    voo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voo'
    },
    checkIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Passageiro', passageiroSchema);