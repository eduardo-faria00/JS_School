import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateClassroomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    classroomNumber: schema.string.optional(),
    capacity: schema.number.optional(),
    disponibility: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
