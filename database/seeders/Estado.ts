import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estado from "App/Models/Estado"

export default class extends BaseSeeder {
  public async run() {
    await Estado.create({
      nome: "Mato Grosso do Sul",
      uf: "MS",
    });

   await Estado.create({
      nome: "Parana",
      uf: "PR",
    });

    await Estado.create({
      nome: "Goias",
      uf: "GO",
    });
  }
}
