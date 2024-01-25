import express from "express";
const router = express.Router();

import {
  findAll,
  create,
  getalumnipays,
  update,
  findOne,
  findAllA,
  getStatus,
  findAllalumn,
  getAlumniStatistics,
  statistiqueChomage,
  getAlumniByPromotion,
  addDemande,
} from "../controllers/alumni.js";

router.get("/getAll", findAll); //-->checked644040b17cb93a4783d4d521
router.get("/getAlla", findAllalumn);
router.post("/create", create);
router.get("/getAllA", findAll);
router.put("/updatebyid/:id", update);
router.get("/getbyid/:id", findOne);
router.get("/getalumnipays", getalumnipays); // ---> checked
router.get("/check/:code", getStatus);
router.get("/stat", getAlumniStatistics);
router.get("/statchomage", statistiqueChomage);
router.get("/getAlumniByPromotion", getAlumniByPromotion);
router.post("/addDemande", addDemande);

export default router;
