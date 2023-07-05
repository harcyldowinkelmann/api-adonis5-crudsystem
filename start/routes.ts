/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  /*Route.get('/', async () => {
    return { hello: 'world' }
  })*/

  // Rota para inserção dos estados
  Route.post("/estados", "EstadosController.store")

  // Rota para inserção das cidades
  //Route.post("/estados/:estadoId/cidades", "CidadesController.store")
  Route.resource("/cidades", "CidadesController")

  /* Rotas para os Planos */

  Route.resource("/planos", "PlanosController")

  /* Fim rotas dos Planos*/

  /* Rotas para os Clientes */

  Route.resource("/clientes", "ClientesController")

  /* Fim rotas dos Clientes */

}).prefix('/api')
