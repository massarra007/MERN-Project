import express from "express";
const router = express.Router();

import { create } from "../controllers/demande.js";
// checked
router.post("/create", create);
export default router;
