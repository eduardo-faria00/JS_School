import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => User)
  public students: ManyToMany<typeof User>

  @column()
  public classroomNumber: string

  @column()
  public capacity: number

  @column()
  public disponibility: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
