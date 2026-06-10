import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-me", authUser, getMe);

export default router;
