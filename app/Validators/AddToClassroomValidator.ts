import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AddToClassroomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public data = {
    classroomId: this.ctx.request.param('id'),
    studentId: this.ctx.request.input('studentId'),
  }

  public schema = schema.create({
    classroomId: schema.number([rules.exists({ table: 'classrooms', column: 'id' })]),
    studentId: schema.number([
      rules.exists({ table: 'users', column: 'id', where: { role: 'student' } }),
    ]),
  })

  public messages = {}
}
