import express from "express"
import { signInUser, signUpUser } from "../Controller/auth.js"
const routes = express.Router();

routes.post("/signin", signInUser);
routes.post("/signup", signUpUser)

export default routes