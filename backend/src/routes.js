// Arquivo com todas as rotas da aplicação

const express = require('express');

const SessionClienteController = require('./controllers/SessionClienteController'); // Login Cliente Controller
const SesesionFuncionarioController = require('./controllers/SessionFuncionarioController'); // Login Cliente Controller

const ClienteController = require('./controllers/ClienteController'); // Cliente Controller
const FuncionarioController = require('./controllers/FuncionarioController'); // Funcionário Controller
const PetController = require('./controllers/PetController'); // Pet Controller
const ConsultaController = require('./controllers/ConsultaController'); // Consulta Controller

const { request } = require('express');

const routes = express.Router();

routes.post('/session_cliente', SessionClienteController.create); // Login Cliente
routes.post('/session_funcionario', SesesionFuncionarioController.create); // Login Funcionário

routes.get('/cliente', ClienteController.index); // List Cliente
routes.post('/cliente', ClienteController.create); // Create Cliente

routes.get('/funcionario', FuncionarioController.index); // List Funcionario
routes.post('/funcionario', FuncionarioController.create); // Create Funcionario

routes.get('/pet', PetController.index); // List Pet
routes.get('/pet/all',PetController.all);
routes.post('/pet', PetController.create); // Create Pet

routes.delete('/pet/:id', PetController.delete); // Delete Pet

routes.get('/consulta', ConsultaController.index); // List Consulta
routes.get('/consulta/all', ConsultaController.all); // List Consulta
routes.post('/consulta', ConsultaController.create); // Create Consulta
routes.delete('/consulta/:id', ConsultaController.delete); // Delete Consulta


routes.get('/funcionarios',FuncionarioController.index);


module.exports = routes;