import express from "express";
const router = express.Router();

import {
  signupEnseignant,
  signin,
  Statistiqueenseignant,
  getEnseignant,
  deleteEnseignant,
  updateEnseignant,
  listAlumnis,
  acceptee,
  reportAlumnis,
} from "../controllers/enseignant.js";

// all are checked
router.post("/signup", signupEnseignant);
router.get("/", getEnseignant);
router.delete("/delete", deleteEnseignant);
router.patch("/", updateEnseignant);
router.post("/signin", signin);
router.get("/getcount", Statistiqueenseignant);
router.get("/lists", listAlumnis);
router.post("/acceptAlumni/:id", acceptee);
router.put("/report/:id", reportAlumnis);

export default router;
