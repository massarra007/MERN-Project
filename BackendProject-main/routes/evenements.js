import express from "express";
const router = express.Router();

import {
  create,
  findAll,
  findOne,
  update,
  deleteEv,
  findAllEvent
} from "../controllers/evenement.js";

router.post("/create", create); // --->checked

router.get("/getAll", findAll); // --->checked
router.get("/getAllEventSaison/:annee", findAllEvent); // --->checked

router.get("/getbyid/:id", findOne); // --->checked

router.put("/updatebyid/:id", update); // --->checked

router.delete("/deletebyid/:id", deleteEv); // --->checked

export default router;
