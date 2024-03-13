import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { createValidators } from './user.validator.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.get("/", userController.getAll);
router.post("/", [...createValidators, validate], userController.createPersons);

export default router;


