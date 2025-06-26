import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

// router.get("/users", getAllUsers);
router.post("/users", getAllUsers);

export default router;
