// Regras de negócio do Agendamento

const connection = require('../database/connection'); // Importa a conexão com o banco de dados
const crypto = require('crypto'); // Biblioteca de criptografia

module.exports = {

    // Listar
    async index(request, response) {
        const { id } = request.params; // Pega o ID da Consulta
        const cliente_email = request.headers.authorization; // Pega o ID do Cliente

        const consultas = await connection('consulta').select('*')
            .where('cliente_email', cliente_email);
        return response.json(consultas); // Retorna todos os consultas cadastrados
    },

    //Listar
    async all(request, response) {
        const consultas = await connection('consulta').select('*');
        return response.json(consultas); // Retorna todos os consultas cadastrados
    },

    // Criar
    async create(request, response) {
        const { especialidade, data, hora, pet_id } = request.body; // Pega as informação 
        
        const id = crypto.randomBytes(4).toString('HEX'); // Cria um ID personalizado para cada consulta 
        
        const cliente_email = request.headers.authorization; // Pega o ID do Cliente logado

        // Insere no banco de dados as informações
        await connection('consulta').insert({
            id,
            especialidade,
            data,
            hora,
            cliente_email,
            pet_id
        });

        return response.json({ especialidade, data, hora, cliente_email, pet_id }); // Retorna o ID do usuário que foi inserido no banco
    },


    
    // Excluir
    async delete(request, response) {
        const { id } = request.params; // Pega o ID da Consulta
        const cliente_email = request.headers.authorization; // Pega o ID do Cliente

        // Retorna a consulta com ID e o CLIENTE_EMAIL informado
        const consulta = await connection('consulta')
            .where('id', id)
            .select('cliente_email')
            .first();

        // Verifica se a consulta foi cadastrada pelo cliente, caso contrário emitir erro 401 (Não autorizado)
        if (consulta.cliente_email !== cliente_email) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        // Se estiver tudo correto, exclui a consulta do banco de dados
        await connection('consulta').where('id', id).delete();

        // Retorna status 204, consulta excluída com sucesso!
        return response.status(204).send();
    }
};