import { Router } from "express";
import userController from "../controllers/UserController";

import loginRequired from "../middlewares/loginRequired";

const route = new Router()

//Não deveria existir
// route.get('/', userController.index) // Lista usuários
// route.get('/:id', userController.show) // Lista usuário

// Deveria existir
route.post('/', userController.create)
route.put('/', loginRequired, userController.update)
route.delete('/', loginRequired, userController.delete)

export default route;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
