import express from "express";
import pfe from "../models/pfe.js";
import Users from "../models/users.js";
import {Socket} from '../app.js';
import Notification from "../models/notification.js";
import { getpfebyidetudiant } from "../controllers/pfe.js";
const router = express.Router();

//import {createPfe, deletePFE, getPfe} from '../controllers/pfe.js';
//router.post('/:id', createPfe);
//router.get('/', getPfe );
//router.delete('/delete',deletePFE);
router.get("/notencadred", async (req, res) => {
  try {
    const listepfe = await pfe.find({id_enseignant:null});
    console.log(listepfe);

    res.status(200).json(listepfe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/getstatpfe", async (req, res) => {
  const pfeData = await pfe.find();

  const pfeBySociete = await pfe.aggregate([
    { $group: { _id: "$societe", count: { $sum: 1 } } },
  ]);

  const pfeByTechnologie = await pfe.aggregate([
    { $group: { _id: "$technologies", count: { $sum: 1 } } },
  ]);

  const pfeByEnseignant = await pfe.aggregate([
    { $group: { _id: "$emailEnseignant", count: { $sum: 1 } } },
  ]);
  const pfeByPays = await pfe.aggregate([
    { $group: { _id: "$pays", count: { $sum: 1 } } },
  ]);
  console.log(pfeBySociete);
  res.send({
    pfeBySociete,
    pfeByTechnologie,
    pfeByEnseignant,
    pfeByPays,
  });
});
router.get("/:id", async (req, res) => {
  const idenseignant = req.params.id;
  try {
    const listepfe = await pfe.find({ id_enseignant: idenseignant });

    res.status(200).json(listepfe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const listepfe = await pfe.find();

    res.status(200).json(listepfe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});



router.post("/createPfe", async (req, res) => {
  try {
    // Validate request
    if (!req.body.sujet) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const stage = new pfe(req.body);

    const saved_stage = await stage.save(stage);
    if (!saved_stage) {
      return res.status(500).send({
        message: "Some error occurred while creating the Intership.",
      });
    }
    return res.status(200).send(stage);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Intership.",
    });
  }
});
router.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const stage = await pfe.find({ id_etudiant: id });
    res.status(200).send(stage);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getbyidenseignant/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const stage = await pfe.find({ id_enseignant: id });
    res.status(200).send(stage);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getid/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const stage = await pfe.findById(id);
    res.status(200).send(stage);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/updatebyid/:id", async (req, res) => {
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  
  const id = req.params.id;
  const onepfe = await pfe.findById(id);
  pfe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      }
      const notification = new Notification({
        title: `Affectation de votre Stage Pfe= ${onepfe.sujet}`,
        body: `Votre Stage Pfe a ete affecté a le prof ${req.body.emailEnseignant}`,
        user: onepfe.id_etudiant,
      });
      const savedNotification = await notification.save();
      Socket.emit('notification', savedNotification);   
      res.send({ message: "user was updated successfully." });
     
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating user with id=" + id,
      }
      
      );
    });
});
router.delete("/deletebyid/:id", async (req, res) => {
  const id = req.params.id;

  pfe
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.send({
          message: "user was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
});
router.get("/getpfebyidetudiant/:id", getpfebyidetudiant);


router.get("/getstudent/:id",async (req, res) => {
  const pfeId = req.params.id;
  try {
    const Pfe = await pfe.findById(pfeId)
    console.log(Pfe);;
    if (!Pfe) {
      return res.status(404).json({ error: "PFE not found" });
    }
    const studentId = Pfe.id_etudiant;
    return res.json({ studentId });
  } catch (error) {
    console.error("Error retrieving student ID:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
