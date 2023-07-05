import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Cidade from "App/Models/Cidade"
import Estado from 'App/Models/Estado'

export default class CidadesController {

    public async validationCidade(request) {
        const schemaCidade = schema.create({
             nome: schema.string([
                 rules.unique({table: 'cidades', column: 'nome'})
             ]),

            estado_id: schema.number([
                rules.nullable()
            ])
        });

        const message = {
            required: "Campo Vazio!",
            minLength: "ID de estado inválido!",
            unique: 'Cadastro duplicado!'
        }

        return await request.validate({ schema: schemaCidade, messages: message });
    }

    public async store({request, params, response}: HttpContextContract){

        try{
            const estadoId = params.estadoId
            await Estado.findOrFail(estadoId)
            const validationEstado = await this.validationCidade(request)

            //body.estadoId = estadoId

            const cidade = await Cidade.create(validationEstado)
            response.send(cidade)

        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel cadastrar os dados da cidade!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao cadastrar cidade",
                message_error: error.toString()
            })
        }

    }

    public async index({ response }: HttpContextContract) { // GET

        try{
            const cidade = await Cidade.all()
            return cidade
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel mostrar os dados da cidade!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao mostrar cidade",
                message_error: error.toString()
            })
        }
    }

    public async update({ request, response }: HttpContextContract) { // PUT

        try{
            const cidadeId = request.param('id')
            const validation = await this.validationCidade(request)
            const cidade = await Cidade.findOrFail(cidadeId)
            await cidade.merge(validation).save()
            response.send(cidade);

        //return cidade
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel atualizar os dados da cidade!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao alterar cadastro de cidade",
                message_error: error.toString()
            })
        }
    }

    public async destroy({ request, response }: HttpContextContract) { // DELETE

        try{
            const cidadeId = request.param('id')
            const cidade = await Cidade.findOrFail(cidadeId)
            await cidade.delete()
            response.send(cidade);
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel deletar os dados da cidade!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao salvar cadastro",
                message_error: error.toString()
            }) 
        }
    }

    public async show({ response }: HttpContextContract) {

        try{
            const cidade = await Cidade
            .query()
            .preload("estado")
            .first()

            response.send(cidade)
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel deletar os dados da cidade!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao salvar cadastro",
                message_error: error.toString()
            }) 
        }

        // if (!cidade) {
        //     return response.status(404).json({ sucess: false, msg: "Cidade Não cadastrada", })
        // }

        // return response.status(200).json({ success: true, data: cidade, })
    }
}
