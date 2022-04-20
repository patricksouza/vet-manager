// Arquivo principal da aplicação 

const express = require('express'); 
const cors = require('cors');
const routes = require('./routes'); // Importa as rotas

const app = express(); // Intancia a aplicação
const HOST = "0.0.0.0";
const PORT = 3332;

app.use(cors()); // Permite que as aplicações frontend acessem esse backend
app.use(express.json()); // Utiliza JSON
app.use(routes); // Utiliza as rotas

app.listen(PORT,HOST); // Porta onde a aplicação irá rodar