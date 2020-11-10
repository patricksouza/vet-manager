// Regras de negócio Login Funcionário

const connection = require('../database/connection'); // Importa a conexão com o banco de dados

module.exports = {
    async create(request, response) {
        const { email, senha } = request.body;

        const funcionario = await connection('funcionario')
            .where('email', email)
            .andWhere('senha', senha)
            .select('nome', 'privilegio')
            .first();

        if (!funcionario) {
            return response.status(400).json({ error: 'Email ou Senha inválido.'});
        }

        return response.json(funcionario);
    }
}