import Aluno from "../models/Aluno"

class HomeController {
  async index(req, res){
    const novoAluno = await Aluno.create({
      nome: "Diego",
      sobrenome: "Cardoso",
      email: "diegocardosobsantos@gmail.com",
      idade: 20,
      peso: 70,
      altura: 1.80
    })
    res.json(novoAluno)
  }
}

export default new HomeController();
