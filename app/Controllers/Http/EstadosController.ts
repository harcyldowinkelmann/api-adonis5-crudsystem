// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Estado from "App/Models/Estado";

export default class EstadosController {

    public async store(){

        const MS = await Estado.create({
            nome: "Mato Grosso do Sul",
            uf: "MS",
        })

        const PR = await Estado.create({
            nome: "Parana",
            uf: "PR",
        })

        const GO = await Estado.create({
            nome: "Goias",
            uf: "GO",
        })

        return {
            MS, PR, GO
        }
    }
}
