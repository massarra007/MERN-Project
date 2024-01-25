import express from "express";
const router = express.Router();

import {
  createpfa,
  deletePFA,
  getAllPfa,
  getPfa,
  updatepfa,
  getTechnologiesByPfaId,
  getStudentByPfaId,
  getPfaWithoutEtudiant,
  updatePfaIdEtudiant,
  getTeacherByPfaId,
  getPfaByEnseignantId,
  getAllTeachersByPfa,
  updatePfaIsValidated,
  getPfaNotValidated,
  getStudentIdOfPFA,
  getpfabyidetudiant
} from "../controllers/pfa.js";

router.post("/updateidstudentinpfa/:id", updatePfaIdEtudiant);
router.get("/getpfawithoutetudiant", getPfaWithoutEtudiant);
router.get("/getpfanotvalidated", getPfaNotValidated);
router.get("/getallteachers", getAllTeachersByPfa);
router.get("/getpfabyenseignant/:id", getPfaByEnseignantId);

router.get("/getpfabyidetudiant/:id", getpfabyidetudiant);

router.post("/createpfa", createpfa);
router.get("/gettechnologiebypfaid/:id", getTechnologiesByPfaId);
router.get("/getstudentbypfaid/:id", getStudentByPfaId);
router.get("/getteacherbypfaid/:id", getTeacherByPfaId);
router.get("/getpfabyid/:id", getPfa);
router.delete("/deletepfa/:id", deletePFA);
router.get("/getAllPfa", getAllPfa);
router.get("/getstudentforcv/:id", getStudentIdOfPFA);
router.put("/updatepfa/:id", updatepfa);
router.post("/updatevalidatepfa/:id", updatePfaIsValidated);

export default router;
