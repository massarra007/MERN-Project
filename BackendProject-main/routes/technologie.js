import express from "express";
const router = express.Router();

import {
  CreateTechnologie,
  GetAllTechnologies,
  getTechnologiebyid,
  getTechnologiebytitle,
} from "../controllers/technologie.js";

router.post("/createtechnologie", CreateTechnologie);
router.get("/gettechnologiebyid/:id", getTechnologiebyid);
router.get("/gettechnologiebytitle/:title", getTechnologiebytitle);
router.get("/getAllTechnologies", GetAllTechnologies);

export default router;
