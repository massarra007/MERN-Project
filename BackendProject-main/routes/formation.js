import express from 'express';
const router = express.Router();

import {createFormation, getFormation, deleteFormation} from '../controllers/formation.js';

// all are checked
router.post('/create', createFormation);
router.get('/', getFormation);
router.delete('/delete', deleteFormation) // ---> params


export default router;