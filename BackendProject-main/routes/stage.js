import express from "express";
const router = express.Router();

//import { findAll, create } from "../controllers/stageete.controller.js";
import StageEte from "../models/stageEte.js";
import mongoose from "mongoose";
import { ObjectID } from "bson";

//router.get("/getAll", findAll);
//router.post("/create", create);
router.post("/create", async (req, res) => {
    try {
        console.log("ici");
        // Validate request
        if (!req.body.sujet) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }
    
        const stage = new StageEte(req.body);
    
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
   const  id = req.params.id;

    try {
      const stage = await StageEte.find({id_etudiant: id});
      res.status(200).send(stage);
    }catch (error) {
      res.status(400).send(error);
    }
  });
  router.get("/getid/:id", async (req, res) => {
    const  id = req.params.id;
 
     try {
       const stage = await StageEte.findById(id);
       res.status(200).send(stage);
     }catch (error) {
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
  
    StageEte.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
          });
        } else res.send({ message: "user was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating user with id=" + id,
        });
      });
  });
  router.delete("/deletebyid/:id", async (req, res) => {
    const id = req.params.id;
  
    StageEte.findByIdAndRemove(id)
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
  
export default router;
