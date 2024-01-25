import express from 'express';
const router = express.Router();

import {create,
        findAll,
        findOne,
        update,
        deleteOf,

} from '../controllers/evenement_participation.js';
router.post('/create', create); //--->cheked
router.get("/", findAll);  // --> checked
router.get("/getbyid/:id", findOne); // --> checked

router.put("/:id", update); // --> checked

router.delete("/deletebyid/:id", deleteOf); // --> checked 

export default router;