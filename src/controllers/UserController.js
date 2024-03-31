import User from "../models/User"

class UserController {
  // Index
  async index(req, res){
    try{
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email']
      })
      return res.json(users)
    }catch(e){
      // Programa quebrou
      return res.json(null)
    }
  }

  // Show
  async show(req, res){
    try{
      //const { id } = req.params
      const id = req.params.id
      const user = await User.findByPk(id)
      return res.json({
        id: user.id,
        nome: user.nome,
        email: user.email
      })
    }catch(e){
      return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  // Create/Store
  async create(req, res){
    try{
      const novoUser = await User.create(req.body)
      return res.json({
        id: novoUser.id,
        nome: novoUser.nome,
        email: novoUser.email
      })
    }catch(e){
       return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  // Update
  async update(req, res){
    try{
      const id = req.userId

      const user = await User.findByPk(id)
      if(!user){
        return res.status(400).json({
          errors: ['Usuário não existe']
        })
      }

      const editUser = await user.update(req.body)
      return res.json({
        id: editUser.id,
        nome: editUser.nome,
        email: editUser.email
      })
    }catch(e){
       return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

  // Delete

  async delete(req, res){
    try{
      const id = req.userId

      const user = await User.findByPk(id)
      if(!user){
        return res.status(400).json({
          errors: ['Usuário não existe']
        })
      }

      await user.destroy()
      return res.json(null)
    }catch(e){
       return res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }
  }

}

export default new UserController();
