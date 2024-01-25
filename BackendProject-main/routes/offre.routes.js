import express from "express";
const router = express.Router();

import {
  create,
  findAll,
  findOne,
  update,
  deleteOf,
} from "../controllers/offre.controller.js";

router.post("/create", create);

router.get("/getAll", findAll);
router.get("/getbyid/:id", findOne);

router.put("/updatebyid/:id", update);

router.delete("/deletebyid/:id", deleteOf);

export default router;
