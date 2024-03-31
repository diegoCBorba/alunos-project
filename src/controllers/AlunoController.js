import Aluno from "../models/Aluno"
import Foto from "../models/Foto";

class AlunoController {
  async index(req, res){
    try{
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename', 'originalname']
        },
      });

      res.json(alunos)
    }catch(e){
      // Programa quebrou
      return res.json(null)
    }
  }

  async show(req, res){
    try{
      const ID = req.params.id
      if(!ID || isNaN(ID)){
        return res.status(400).json({
          errors: ['ID inválido.']
        })
      }

      const aluno = await Aluno.findByPk(ID, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename', 'originalname']
        },
      })
      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno inválido.']
        })
      }

      return res.status(200).json(aluno)
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async create(req, res){
    try{
      const novoAluno = await Aluno.create(req.body)
      const { id, nome, sobrenome, email, peso, altura } = novoAluno
      return res.status(200).json({ id, nome, sobrenome, email, peso, altura })
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async update(req, res){
    try{
      const ID = req.params.id
      if(!ID || isNaN(ID)){
        return res.status(400).json({
          errors: ['ID inválido.']
        })
      }

      const aluno = await Aluno.findByPk(ID)
      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno não existe.']
        })
      }

      const editAluno = await aluno.update(req.body)

      const { id, nome, sobrenome, email, peso, altura } = editAluno
      return res.status(200).json({ id, nome, sobrenome, email, peso, altura })
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  async delete(req, res){
    try{
      const ID = req.params.id
      if(!ID || isNaN(ID)){
        return res.status(400).json({
          errors: ['ID inválido.']
        })
      }

      const aluno = await Aluno.findByPk(ID)
      if(!aluno){
        return res.status(400).json({
          errors: ['Aluno não existe.']
        })
      }

      await aluno.destroy()
      return res.json(null)
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }
}

export default new AlunoController();
