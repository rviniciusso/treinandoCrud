const express = require('express');

const controllers = require('../controllers/controllers.js');

const routes = express.Router();

routes.get('/item', controllers.listar);
routes.get('/item/:termo', controllers.buscar);
routes.get('/item/busca/:id', controllers.buscarId);
routes.post('/item', controllers.cadastrar);
routes.patch('/item/:id', controllers.atualizar);
routes.delete('/item/:id', controllers.deletar);

module.exports = routes;