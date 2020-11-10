// Regras de negócio da entidade Cliente

const connection = require('../database/connection'); // Importa a conexão com o banco de dados

module.exports = {

    // Listar
    async index(request, response) {
        const clientes = await connection('cliente').select('*'); // Seleciona tudo da tabela de Cliente
        
        return response.json(clientes); // Retorna todos os clientes cadastrados
    },

    // Criar
    async create(request, response) {
        const { nome, sobrenome, email, telefone, cidade, estado, senha } = request.body; // Pega as informação 
        
        const privilegio = 'USER'; // Seta o privilegio para USER para diferenciar o ambiente no sistema (Pode ser USER ou ADMIN)

        // Insere no banco de dados as informações
        await connection('cliente').insert({
            nome,
            sobrenome,
            email,
            telefone,
            cidade,
            estado,
            senha,
            privilegio,
        });

        return response.json({ email }); // Retorna o Email do usuário que foi inserido no banco
    }
};