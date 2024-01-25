import express from 'express';
const router = express.Router();
import Directeurs from'../models/directeurs.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register directeurs  ---> checked
router.post('/register', async (req, res)=>{
        //data=req.body;
      const   directeur = new Directeurs (req.body);
       const salt = bcrypt.genSaltSync(10);
       const  cryptedPass = await bcrypt.hashSync (req.body.password, salt);
        directeur.password = cryptedPass;
        directeur.save()
        .then ((saved)=>{
            res.status(200).send(saved)
        })
        .catch((err)=>{
        res.status(400).send(err);
    })
})

// login directeur  --> checked
router.post('/signin', async (req, res)=>{
   // data=req.body;
   const  directeur = await Directeurs.findOne({login: req.body.login})
if(!directeur){
    res.status(404).send('login or password invalid')
}else{
   const  validPass = bcrypt.compareSync(req.body.password , directeur.password)

    if(!validPass){
        res.status(401).send('login or password invalid')
    }else{
      const  payload = {
            _id: directeur._id,
            login: directeur.login
        }
      const  token = jwt.sign(payload, '123456')
        res.status(200).send({ mytoken: token })
    }
 }
})



export default router;