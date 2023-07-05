import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Plano from 'App/Models/Plano';

// import { HttpContext } from "@adonisjs/core/build/standalone";

export default class PlanosController {

    public async validationPlano(request){
        const schemaPlano = schema.create({
            descricao : schema.string([
                rules.minLength(4)
            ]),
            valor_mensalidade: schema.number([
                rules.nullable()
            ]) 
        })

        const message = {
            minLength: "Campo vazio, ou, não contém caracteres suficientes!",
            nullable: "Campo de preço não pode ser nulo"
        }

        return await request.validate({schema: schemaPlano, messages: message})
    }

    public async index({ response }: HttpContextContract) { // GET
        
        try{
            const plano = Plano.all()
            response.send(plano)
            return plano
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel mostrar os dados do plano!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao mostrar cadastro do plano",
                message_error: error.toString()
            })
        }
    }

    public async store({ request, response }: HttpContextContract) { // POST

        try {

            const validationPlano = await this.validationPlano(request)

            const plano = await Plano.create(validationPlano)

            response.send(plano)
        } catch (error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel cadastrar os dados do plano!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao cadastrar plano",
                message_error: error.toString()
            })
        }
    }

    public async update({ request, response }: HttpContextContract) { // PUT

        try{
            const planoId = request.param('id')
            const validationPlano = await this.validationPlano(request)
            //const body = request.only(['descricao', 'valor_mensalidade'])
            const plano = await Plano.findOrFail(planoId)
            await plano.merge(validationPlano).save()
            response.send(plano)

            return plano
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel alterar os dados do plano!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao alterar cadastro do plano",
                message_error: error.toString()
            })
        }
    }

    public async destroy({ request, response }: HttpContextContract) { // DELETE
        try{
            const planoId = request.param('id')
            const plano = await Plano.findOrFail(planoId)
            await plano.delete()
            response.send(plano)
        } catch(error) {
            if (error && !error.flashToSession && error.messages) {
                return response.status(500).send({
                    status: false,
                    message: 'Não foi possivel deletar os dados do plano!',
                    error: error.messages.errors
                });
            }

            response.status(500).send({
                message: "Erro ao deletar cadastro do plano",
                message_error: error.toString()
            })
        }
    }
}