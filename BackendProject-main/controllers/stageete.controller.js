import StageEte from "../models/stageEte.js";

export const findAll = async (req, res) => {
  //checked
  try {
    await StageEte.find({}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
export const create = async (req, res) => {
  //checked
  try {
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
};
