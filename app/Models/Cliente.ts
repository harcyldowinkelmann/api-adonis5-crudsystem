import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cidade from './Cidade'
import Plano from './Plano'

export default class Cliente extends BaseModel {

  // , CNPJ/CPF, Nome, Telefone, Endereco, Data de Contrato, Data de Cadastro, Número do contrato
  @column({ isPrimary: true })
  public id: number

  @column()
  public cpf: string

  @column()
  public nome: string

  @column()
  public telefone: string

  @column()
  public endereco: string

  @column()
  public data_contrato: Date

  @column()
  public data_cadastro: Date

  @column()
  public numero_contrato: number

  @column()
  public cidade_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public plano_id: number

  @belongsTo(() => Cidade, {
    foreignKey : "cidade_id"
  })
  public cidade: BelongsTo<typeof Cidade>

  @belongsTo(() => Plano,{
    foreignKey: 'plano_id'
  })
  public plano: BelongsTo<typeof Plano>
}