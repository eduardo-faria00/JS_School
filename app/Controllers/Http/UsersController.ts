import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import User from '../../Models/User'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    let { page, limit } = request.qs()
    // limitando em 50 para evitar sobrecarga do banco de dados
    limit = limit > 50 ? 50 : limit
    const users = await User.query().paginate(page || 1, limit || 10)

    return users
  }

  public async store({ request }: HttpContextContract) {
    const body = await request.validate(CreateUserValidator)

    const user = await User.create(body)
    return user
  }

  public async show({ auth }: HttpContextContract) {
    return auth.user!
  }

  public async update({ auth, request }: HttpContextContract) {
    const body = await request.validate(UpdateUserValidator)
    const user = auth.user!

    await user.merge(body).save()

    return user
  }

  public async destroy({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)

    await user.delete()
  }
}
