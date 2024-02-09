import express from "express";
import { resultCreate, resultGet } from "../controllers/result.controller.js";

const router = express.Router();

router.post("/", resultCreate);

router.get("/", resultGet);

export default router;
