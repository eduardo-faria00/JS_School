import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    email: schema.string.optional([rules.email()]),
    password: schema.string.optional([rules.confirmed(), rules.minLength(4)]),
    registration: schema.string.optional(),
    role: schema.enum.optional(['student', 'teacher'] as const),
    birth: schema.date.optional(),
  })

  public messages: CustomMessages = {}
}
