exports.seed = function(knex,Promisse) {
    return knex('funcionario').del()
    .then(function () {

      return knex('funcionario').insert([
        {

          email: 'func@func.com',
          senha: 'mudar123',
          nome:'Funcionario',
          sobrenome:'Colaborador',
          telefone:'02323232',
          cidade:'Manaus',
          estado:'AM',
          cargo:'atendente',
          privilegio:'ADM'

        },
        {
       
            email: 'fun2c@func.com',
            senha: 'mudar123',
            nome:'Funcionario',
            sobrenome:'Colaborador',
            telefone:'02323232',
            cidade:'Manaus',
            estado:'AM',
            cargo:'atendente',
            privilegio:'ADM'
  
          },
          {
       
            email: 'fun2c3@func.com',
            senha: 'mudar123',
            nome:'Funcionario',
            sobrenome:'Colaborador',
            telefone:'02323232',
            cidade:'Manaus',
            estado:'AM',
            cargo:'atendente',
            privilegio:'USER'
  
          },
      ]);
    });
};
