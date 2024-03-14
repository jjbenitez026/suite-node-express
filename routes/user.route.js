import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { createValidators } from './user.validator.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.get("/", userController.getAll);
router.get("/search/:id", userController.getByID);
router.post("/create", [...createValidators, validate], userController.createPersons);
router.put("/update/:id", [...createValidators, validate], userController.updateUser);
router.delete("/delete/:id",userController.deletUser);

export default router;


