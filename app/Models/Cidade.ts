import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Estado from './Estado'

export default class Cidade extends BaseModel {

  @hasMany(() => Cliente)
  public clientes: HasMany<typeof Cliente> 

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public estado_id: number

  @belongsTo(() => Estado,{
    foreignKey: 'estado_id'
  })
  public estado: BelongsTo<typeof Estado>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}