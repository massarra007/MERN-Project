import Demande from "../models/demandes.js";

export const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const dem = new Demande(req.body);

    const saved_demande = await dem.save(dem);
    if (!saved_demande) {
      return res.status(500).send({
        message: "Some error occurred while creating the Demande.",
      });
    }
    return res.status(200).send(dem);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Demande.",
    });
  }
};
