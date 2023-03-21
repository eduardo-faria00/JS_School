import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import User from '../../Models/User'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    let { page, limit } = request.qs()
    // limitando em 50 para evitar sobrecarga do banco de dados
    limit = limit > 50 ? 50 : limit
    const users = await User.query().paginate(page, limit)

    return users
  }

  public async store({ request }: HttpContextContract) {
    const body = await request.validate(CreateUserValidator)

    const user = await User.create(body)
    return user
  }

  public async show({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)

    return user
  }

  public async update({ auth, bouncer, request }: HttpContextContract) {
    const userId = request.param('id')

    await bouncer.authorize()

    const body = await request.validate(UpdateUserValidator)
    const user = await User.findOrFail(userId)

    await user.merge(body).save()

    return user
  }

  public async destroy({ request }: HttpContextContract) {
    const userId = request.param('id')
    const user = await User.findOrFail(userId)

    await user.delete()
  }
}
