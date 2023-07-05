import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cpf').unique()
      table.string('nome')
      table.string('telefone')
      table.string('endereco')
      table.date('data_contrato')
      table.date('data_cadastro')
      table.integer('numero_contrato')

      table.integer("cidade_id").unsigned().references("cidades.id").onDelete("CASCADE")
      table.integer('plano_id').unsigned().references('planos.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
