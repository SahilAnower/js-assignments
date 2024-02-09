import express from "express";
import {
  questionCreate,
  questionGetRandom,
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/", questionCreate);

router.get("/", questionGetRandom);

export default router;
