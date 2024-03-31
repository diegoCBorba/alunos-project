import { Router } from "express";
import tokenController from "../controllers/TokenController";
const route = new Router()

route.post('/', tokenController.create)

export default route;
