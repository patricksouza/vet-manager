exports.up = function(knex) {
    return knex.schema.createTable('pet', function (table) {
        table.string('id').primary(); // Chave primária
        table.string('nome').notNullable();
        table.string('raca').notNullable();
        table.string('sexo').notNullable();
        table.string('especie').notNullable();
        table.double('peso').notNullable();
        table.integer('idade').notNullable();
        
        table.string('cliente_email').notNullable();
        table.foreign('cliente_email').references('email').inTable('cliente');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pet');
};
