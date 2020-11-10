// Regras de negócio da entidade Pet

const connection = require('../database/connection'); // Importa a conexão com o banco de dados
const crypto = require('crypto'); // Biblioteca de criptografia

module.exports = {

    // Listar
    async index(request, response) {
        const cliente_email = request.headers.authorization; 
        const pets = await connection('pet').select('*').where('cliente_email',cliente_email); // Seleciona tudo da tabela de pet
        
        return response.json(pets); // Retorna todos os pets cadastrados
    },

    async all(request, response) {
        const pets = await connection('pet').select('*'); // Seleciona tudo da tabela de pet
        return response.json(pets); // Retorna todos os pets cadastrados
    },

    // Criar
    async create(request, response) {
        const { nome, raca, sexo, especie, peso, idade } = request.body; // Pega as informação
        const id = crypto.randomBytes(4).toString('HEX'); // Cria um ID personalizado para cada pet 
        const cliente_email = request.headers.authorization; // Pega o ID do Cliente logado
        // Insere no banco de dados as informações

       
        const [id_pet] = await connection('pet').insert({
            id,
            nome,
            raca,
            sexo,
            especie,
            peso,
            idade,
            cliente_email,
        });

        return response.json({id_pet}); // Retorna o ID do Pet e o nome que foi inserido no banco
    },

    // Excluir
    async delete(request, response) {
        const { id } = request.params; // Pega o ID do Pet
        const cliente_email = request.headers.authorization; // Pega o ID do Cliente

        // Retorna o pet com ID e o CLIENTE_ID informado
        const pet = await connection('pet')
            .where('id', id)
            .select('cliente_email')
            .first();

        // Verifica se o pet foi cadastrado pelo cliente, caso contrário emitir erro 401 (Não autorizado)
        if (pet.cliente_email !== cliente_email) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        // Se estiver tudo correto, exclui o pet do banco de dados
        await connection('pet').where('id', id).delete();

        // Retorna status 204, pet excluído com sucesso!
        return response.status(204).send();
    }
};