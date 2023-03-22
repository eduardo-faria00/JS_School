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
import '../app/Controllers/Http/UsersController'
import '../app/Controllers/Http/ClassroomsController'

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch (e) {
    return response.unauthorized('Invalid credentials')
  }
})

Route.resource('/users', 'UsersController').middleware({
  update: ['auth'],
  show: ['auth'],
  destroy: ['auth'],
})

Route.post('/classroom/add/:id', 'ClassroomsController.addToClassroom').middleware('auth')
Route.post('/classroom/remove/:id', 'ClassroomsController.removeFromClassroom').middleware('auth')
Route.resource('/classroom', 'ClassroomsController').middleware({
  store: ['auth'],
  update: ['auth'],
  show: ['auth'],
  destroy: ['auth'],
})
