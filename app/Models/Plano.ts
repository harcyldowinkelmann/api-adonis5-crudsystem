import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Plano extends BaseModel {

  @hasMany(() => Cliente)
  public cliente: HasMany<typeof Cliente>

  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

  @column()
  public valor_mensalidade: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
