const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/gestao-voo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo à API de Gestão de Voos',
        rotas: {
            passageiros: '/api/passageiros',
            voos: '/api/voos',
            portoes: '/api/portoes',
            relatorios: '/api/relatorios/diario'
        }
    });
});

// Rotas
const passageiroRoutes = require('./routes/passageiroRoutes');
const vooRoutes = require('./routes/vooRoutes');
const portaoRoutes = require('./routes/portaoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

app.use('/api/passageiros', passageiroRoutes);
app.use('/api/voos', vooRoutes);
app.use('/api/portoes', portaoRoutes);
app.use('/api/relatorios', relatorioRoutes);

// Tratamento de erros para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});