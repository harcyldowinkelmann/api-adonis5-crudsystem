import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Cliente from 'App/Models/Cliente'

// Comentário
export default class ClientesController {

    public async validationCliente(request) {
        const schemaCliente = schema.create({
            cpf: schema.string([
                rules.minLength(14)
            ]),
            nome: schema.string(),
            telefone: schema.string([
                rules.maxLength(14)
            ]),
            endereco: schema.string(),
            data_contrato: schema.date(),
            data_cadastro: schema.date(),
            numero_contrato: schema.number(),
            cidade_id: schema.number(),
            plano_id: schema.number()

        });

        const message = {
            required: "Campo Vazio!",
            minLength: "CPF inválido!",
            maxLenght: "Campo telefone suporte até 14 caracteres"
        }

        return await request.validate({ schema: schemaCliente, messages: message });
    }

    public async index({ response }: HttpContextContract) { // GET

        try{
            const cliente = await Cliente.all()
            return cliente
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel mostrar os dados!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao mostrar cadastros",
                message_error: error.toString()
            })
        }
    }

    public async show({ response }: HttpContextContract) {

        try{
            const cliente = await Cliente
            .query()
            .preload("cidade", (builder) => {
                builder.preload("estado")
            })
            .preload("plano")
            .first()

            response.send(cliente)
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel mostrar os dados!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao mostrar cadastro",
                message_error: error.toString()
            })
        }

        //  if (!cliente) {
        //      return response.status(404).json({ sucess: false, msg: "Cliente Não cadastrado", })
        // }

        // return response.status(200).json({ success: true, data: cliente, })
    }

    public async store({ request, response }: HttpContextContract) { // Post
        try {

            const validation = await this.validationCliente(request)
            const cliente = await Cliente.create(validation);

            response.send(cliente);
        } catch (error) {

            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel cadastrar!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao salvar cadastro",
                message_error: error.toString()
            })
        }
    }

    public async update({ request, response }: HttpContextContract) { // PUT

        try {

            const clienteId = request.param('id')
            const validation = await this.validationCliente(request)
            const cliente = await Cliente.findOrFail(clienteId)
            //const cliente = await Cliente.create(validation);
            //cliente = await Cliente.create(validation);
            //const body = request.only(['cpf', 'nome', 'telefone', 'endereco', 'data_contrato', 'data_cadastro', 'numero_contrato', 'cidade_id', 'plano_id'])
                       
            await cliente.merge(validation).save()
            response.send(cliente);

            return cliente
        } catch (error) {

            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel atualizar o cadastro!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao salvar cadastro",
                message_error: error.toString()
            })
        }
    }

    public async destroy({ request, response }: HttpContextContract) { // DELETE

        try{
            const clienteId = request.param('id')
            const cliente = await Cliente.findOrFail(clienteId)
            await cliente.delete()
            response.send(cliente);
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel atualizar o cadastro!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao salvar cadastro",
                message_error: error.toString()
            })
        }
    }
}