import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string([rules.email()]),
    password: schema.string([rules.minLength(4)]),
    registration: schema.string(),
    role: schema.enum(['student', 'teacher'] as const),
    birth: schema.date(),
  })

  public messages: CustomMessages = {}
}
