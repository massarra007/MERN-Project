import express from 'express';
const router = express.Router();

import {createCv, getAllCv, getCv, getCvByIdUser, updateCv, getCVByUser, updateCV, updateCvMode} from '../controllers/cv.js';

// all are checked
router.post('/create', createCv);
router.get('/getall', getAllCv);
router.get('/getbyid/:id', getCv);
router.get('/getbyuser', getCVByUser);
router.get('/getbyiduser/:iduser', getCvByIdUser);
router.put('/update/:iduser', updateCv) // ---> params
router.put('/updatecv/:id', updateCV) // ---> params
router.put('/updatemode/:id', updateCvMode) // ---> params


export default router;