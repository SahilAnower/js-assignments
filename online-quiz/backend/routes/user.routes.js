import express from "express";
import { userCreate } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", userCreate);

export default router;
