import { Router } from "express";
import userController from "../controllers/UserController";

const route = new Router()

route.post('/', userController.create)

export default route;

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
