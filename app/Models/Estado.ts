import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cidade from './Cidade'

export default class Estado extends BaseModel {

  @hasMany(() => Cidade)
  public cidades: HasMany<typeof Cidade>

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public uf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
