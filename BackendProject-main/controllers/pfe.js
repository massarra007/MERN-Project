import mongoose from "mongoose";
import Enseignant from "../models/enseignant.js";
import PFE from "../models/pfe.js";

export const createPfe = async (req, res) => {
  const { Description, societe, sujet, type, duree, date_debut, id_etudiant } =
    req.body;
  console.log(req.params.id, "parm");
  const idensengnant = req.params.id;
  const enseignant = await Enseignant.findOne({ _id: idensengnant });
  const id_enseignant = enseignant._id;
  const newpfe = new PFE({
    Description,
    societe,
    sujet,
    type,
    duree,
    date_debut,
    id_enseignant,
    id_etudiant,
  });
  try {
    await newpfe.save((err) => {
      if (err) return res.status(400).json({ message: " Error " });
    });
    res.status(200).json({ message: "pfe créer avec succès, Merci " });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("err");
  }
};

export const getPfe = async (req, res) => {
  try {
    const listepfe = await PFE.find();

    res.status(200).json(listepfe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePFE = async (req, res) => {
  try {
    const id = req.query.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const listepfe = await PFE.find({ _id: id });
      listepfe.map(async (el) => {
        await PFE.findByIdAndRemove(el._id);
      });
      res.json({ message: "le pfe a ete supprimer avec succés !" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const getpfebyidetudiant= async (req, res) => {
  try {
    const pfes = await PFE.findOne({ id_etudiant: req.params.id });
    res.json(pfes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};