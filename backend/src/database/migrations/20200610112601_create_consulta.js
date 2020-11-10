exports.up = function(knex) {
    return knex.schema.createTable('consulta', function (table) {
        table.string('id').primary(); // Chave primária
        table.string('especialidade').notNullable();
        table.string('data').notNullable();
        table.string('hora').notNullable();
                
        table.string('cliente_email').notNullable(); // Chave estrangeira Cliente
        table.foreign('cliente_email').references('email').inTable('cliente');

        table.string('pet_id').notNullable(); // Chave estrangeira Pet
        table.foreign('pet_id').references('id').inTable('pet');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('consulta');
};
