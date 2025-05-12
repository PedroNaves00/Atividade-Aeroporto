const mongoose = require('mongoose');

const portaoSchema = new mongoose.Schema({
    numero: {
        type: String,
        required: true,
        unique: true
    },
    disponivel: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Portao', portaoSchema);