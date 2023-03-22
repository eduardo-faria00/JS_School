import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import AddToClassroomValidator from 'App/Validators/AddToClassroomValidator'
import CreateClassroomValidator from 'App/Validators/CreateClassroomValidator'
import UpdateClassroomValidator from 'App/Validators/UpdateClassroomValidator'

export default class ClassroomsController {
  public async index({ request }: HttpContextContract) {
    let { page, limit } = request.qs()
    // limitando em 50 para evitar sobrecarga do banco de dados
    limit = limit > 50 ? 50 : limit
    const classrooms = await Classroom.query().paginate(page || 1, limit || 10)

    return classrooms
  }

  public async store({ request, bouncer }: HttpContextContract) {
    const body = await request.validate(CreateClassroomValidator)

    await bouncer.authorize('createClassroom')

    const classroom = await Classroom.create(body)
    return classroom
  }

  public async show({ request }: HttpContextContract) {
    const classroomId = request.param('id')
    const classroom = Classroom.findOrFail(classroomId)

    return classroom
  }

  public async update({ request, bouncer }: HttpContextContract) {
    const body = await request.validate(UpdateClassroomValidator)
    const classroomId = request.param('id')
    const classroom = await Classroom.findOrFail(classroomId)

    await bouncer.authorize('editClassroom', classroom)

    await classroom.merge(body).save()

    return classroom
  }

  public async destroy({ request, bouncer }: HttpContextContract) {
    const classroomId = request.param('id')
    const classroom = await Classroom.findOrFail(classroomId)

    await bouncer.authorize('editClassroom', classroom)

    await classroom.delete()
  }

  public async addToClassroom({ request, bouncer }: HttpContextContract) {
    const { studentId, classroomId } = await request.validate(AddToClassroomValidator)
    const classroom = await Classroom.findOrFail(classroomId)

    await bouncer.authorize('editClassroom', classroom)

    await classroom.related('students').attach([studentId])
    await classroom.load('students')

    return classroom
  }

  public async removeFromClassroom({ request, bouncer }: HttpContextContract) {
    const { studentId, classroomId } = await request.validate(AddToClassroomValidator)
    const classroom = await Classroom.findOrFail(classroomId)

    await bouncer.authorize('editClassroom', classroom)

    await classroom.related('students').detach([studentId])
    await classroom.load('students')

    return classroom
  }
}
