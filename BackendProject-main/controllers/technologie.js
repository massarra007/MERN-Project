import mongoose from "mongoose";
import Users from "../models/users.js";
import Technologie from "../models/technologie.js";

export const CreateTechnologie = async (req, res) => {
  try {
    const {title } = req.body;
    const existTechnologie = await Technologie.findOne({ title });
    if (existTechnologie)
      return res.status(409).json({
        Message: "Technologie already exist",
        Success: false,
      });
    const newTechnologie = new Technologie({
     title
    });
    const createdTechnologie = await newTechnologie.save();
    return res.status(200).json({
      Message: "Technologie created suucessfully",
      Success: true,
      data: createdTechnologie,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

export const DeleteTechnologie = async (req, res) => {
  try {
    const { _id } = req.params;
    const removeTechnologie = await Technologie.deleteOne({ _id });

    if (!removeTechnologie) {
      return res.status(400).json({ Message: "Failed to delete Technologie" });
    }
    return res.status(200).json({ Message: "Technologie deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

export const getTechnologiebyid = async (req, res) => {
  //checked
  const id = req.params.id;

  try {
    await Technologie.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTechnologiebytitle = async (req, res) => {
  const title = req.params.title;

  try {
    const result = await Technologie.findOne({ title });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

export const GetAllTechnologies = async (req, res) => {

  try {
    const Technologies = await Technologie.find();
    return res
      .status(200)
      .json({ Message: "Technologies found successfully ", data: Technologies });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

