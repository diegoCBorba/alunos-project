import { Router } from "express";
import FotoController from "../controllers/FotoController";

const route = new Router()

route.post('/', FotoController.create)

export default route;
