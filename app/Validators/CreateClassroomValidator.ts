import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClassroomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    classroomNumber: schema.string(),
    capacity: schema.number(),
    disponibility: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
