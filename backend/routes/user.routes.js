import express from "express";
import { registerUser,logIn, logOut } from "../controllers/user.controllers.js";
const router = express.Router();
router.post("/signup",registerUser);
router.post("/login",logIn);
router.get("/logout",logOut);


export default router;