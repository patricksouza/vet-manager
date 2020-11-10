// Regras de negócio Login Cliente

const connection = require('../database/connection'); // Importa a conexão com o banco de dados

module.exports = {
    async create(request, response) {
        // Pega as informações dos campos da aplicação
        const { email, senha } = request.body;

        // select nome, status from cliente where email = email and senha = senha;
        const cliente = await connection('cliente')
            .where('email', email)
            .andWhere('senha', senha)
            .select('nome')
            .first();

        // Caso não tenha o cliente cadastrado
        if (!cliente) {
            return response.status(400).json({ error: 'Email ou Senha inválido.' });
        }

        // Retorna o cliente em formato JSON
        return response.json(cliente);
    }
}