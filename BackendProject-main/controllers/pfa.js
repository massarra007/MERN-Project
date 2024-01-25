import mongoose from "mongoose";
import axios from "axios";
import Users from "../models/users.js";
import PFA from "../models/pfa.js";
import Technologie from "../models/technologie.js";

export const saveTechnologies = async (technologies) => {
  const technologyIds = [];
  for (const element of technologies) {
    const existTechnologie = await Technologie.findOne({ title: element });
    if (existTechnologie) {
      technologyIds.push(existTechnologie._id);
    } else {
      const newTechnologie = new Technologie({
        title: element,
      });
      const createdTechnologie = await newTechnologie.save();
      technologyIds.push(createdTechnologie._id);
    }
  }
  return technologyIds;
};

export const getPfaWithoutEtudiant = async (req, res) => {
  try {
    const pfaList = await PFA.find({
      id_etudiant: { $in: [null, undefined] },
    }).exec();
    return res.json(pfaList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPfaNotValidated = async (req, res) => {
  try {
    const pfaList = await PFA.find({ isValidated: false }).exec();
    return res.json(pfaList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updatePfaIdEtudiant = async (req, res) => {
  const { id } = req.params;
  const { id_etudiant } = req.body;

  try {
    const existingPfa = await PFA.findOne({ id_etudiant });

    if (existingPfa) {
      return res
        .status(400)
        .json({ message: "This student is already assigned to another PFA" });
    }

    const pfa = await PFA.findById(id);

    if (!pfa) {
      return res.status(404).json({ message: "Pfa not found" });
    }

    // update only if id_etudiant is provided
    if (id_etudiant !== undefined) {
      pfa.id_etudiant = id_etudiant === null ? "" : id_etudiant;
      pfa.isAffected = true; // Set isAffected to true
    }

    const updatedPfa = await pfa.save();
    res.json(updatedPfa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentByPfaId = async (req, res) => {
  try {
    const pfaId = req.params.id;
    const pfa = await PFA.findById(pfaId);
    if (!pfa) {
      return res.status(404).json({ message: "PFA not found" });
    }
    const id_etudiant = await Users.find(
      { _id: { $in: pfa.id_etudiant } },
      { firstname: 1, lastname: 1, _id: 0 }
    );
    res.status(200).json(id_etudiant);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error getting student by PFA ID" });
  }
};

export const getAllTeachersByPfa = async (req, res) => {
  try {
    const allPfa = await PFA.find();
    const teacherPromises = allPfa.map(async (pfa) => {
      const teachers = await Users.find(
        { _id: { $in: pfa.id_enseignant } },
        { firstname: 1, lastname: 1, _id: 0 }
      );
      return teachers;
    });
    const allTeachers = await Promise.all(teacherPromises);
    res.status(200).json(allTeachers);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error getting all teachers by PFA" });
  }
};

export const getTeacherByPfaId = async (req, res) => {
  try {
    const pfaId = req.params.id;
    const pfa = await PFA.findById(pfaId);
    if (!pfa) {
      return res.status(404).json({ message: "PFA not found" });
    }
    const id_enseignant = await Users.find(
      { _id: { $in: pfa.id_enseignant } },
      { firstname: 1, lastname: 1, _id: 0 }
    );
    res.status(200).json(id_enseignant);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error getting teacher by PFA ID" });
  }
};

export const getPfaByEnseignantId = async (req, res) => {
  try {
    const pfas = await PFA.find({ id_enseignant: req.params.id }).exec();
    res.json(pfas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getpfabyidetudiant= async (req, res) => {
  try {
    const pfas = await PFA.findOne({ id_etudiant: req.params.id });
    res.json(pfas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTechnologiesByPfaId = async (req, res) => {
  try {
    const pfaId = req.params.id;
    const pfa = await PFA.findById(pfaId);
    if (!pfa) {
      return res.status(404).json({ message: "PFA not found" });
    }
    const technologies = await Technologie.find(
      { _id: { $in: pfa.technologies } },
      { title: 1, _id: 0 } // projection to include only the title field
    );
    res.status(200).json(technologies);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error getting technologies by PFA ID" });
  }
};

export const updatePfaIsValidated = async (req, res) => {
  const { id } = req.params;

  try {
    const pfa = await PFA.findById(id);

    if (!pfa) {
      return res.status(404).json({ message: "Pfa not found" });
    }

    pfa.isValidated = true;

    const updatedPfa = await pfa.save();
    res.json(updatedPfa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentIdOfPFA = async (req, res) => {
  const pfaId = req.params.id;

  try {
    const pfa = await PFA.findById(pfaId).select("id_etudiant");
    if (!pfa) {
      return res.status(404).json({ error: "PFA not found" });
    }
    const studentId = pfa.id_etudiant;
    return res.json({ studentId });
  } catch (error) {
    console.error("Error retrieving student ID:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const createpfa = async (req, res) => {
  try {
    const {
      sujet,
      titre,
      nbre_etudiant,
      description,
      technologies,
      id_enseignant,
      id_etudiant,
      isValidated,
    } = req.body;

    const technologyIds = await saveTechnologies(technologies);

    const newPfa = new PFA({
      sujet: sujet,
      titre: titre,
      nbre_etudiant: nbre_etudiant,
      description: description,
      technologies: technologyIds,
      id_enseignant: id_enseignant,
      id_etudiant: id_etudiant,
      isValidated: isValidated,
    });

    const createdPfa = await newPfa.save();
    return res.status(200).json({
      Message: "PFA created sucessfully",
      Success: true,
      data: createdPfa,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Message: "Error creating PFA",
      Success: false,
      Error: error.message,
    });
  }
};

export const updatepfa = async (req, res) => {
  try {
    const pfaId = req.params.id;
    const {
      sujet,
      titre,
      nbre_etudiant,
      description,
      technologies,
      id_enseignant,
      id_etudiant,
      isValidated,
    } = req.body;

    const technologyIds = await saveTechnologies(technologies);

    const updatedPfa = {
      sujet: sujet,
      titre: titre,
      nbre_etudiant: nbre_etudiant,
      description: description,
      technologies: technologyIds,
      id_enseignant: id_enseignant,
      id_etudiant: id_etudiant,
      isValidated: isValidated,
    };

    const result = await PFA.updateOne({ _id: pfaId }, updatedPfa);

    if (result.nModified === 0) {
      return res.status(404).json({
        Message: "PFA not found",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "PFA updated sucessfully",
      Success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Message: "Error updating PFA",
      Success: false,
      Error: error.message,
    });
  }
};

export const getPfa = async (req, res) => {
  //checked
  const id = req.params.id;

  try {
    await PFA.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllPfa = async (req, res) => {
  try {
    const listepfa = await PFA.find();

    res.status(200).json(listepfa);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePFA = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPfa = await PFA.findByIdAndDelete(id);

    if (!deletedPfa) {
      return res.status(404).json({
        Message: "PFA not found",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "PFA deleted successfully",
      Success: true,
      data: deletedPfa,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Message: "Error deleting PFA",
      Success: false,
      Error: error.message,
    });
  }
};

export const updatePFA = async (req, res) => {
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  PFA.findByIdAndUpdate({ id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update pfa with id=${id}. Maybe pfa was not found!`,
        });
      } else res.send({ message: "PFA was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PFA with id=" + id,
      });
    });
};
