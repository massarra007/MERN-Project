import Offre from "../models/offres.js";

export const create = async (req, res) => {
  //checked
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const ofr = new Offre(req.body);

    const saved_Offre = await ofr.save(ofr);
    if (!saved_Offre) {
      return res.status(500).send({
        message: "Some error occurred while creating the Offre.",
      });
    }
    return res.status(200).send(ofr);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Offre.",
    });
  }
};

export const findAll = async (req, res) => {
  //checked
  try {
    await Offre.find({}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const findOne = async (req, res) => {
  //checked
  const id = req.params.id;

  try {
    await Offre.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const update = (req, res) => {
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Offre.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Offre with id=${id}. Maybe Offre was not found!`,
        });
      } else res.send({ message: "Offre was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Offre with id=" + id,
      });
    });
};

export const deleteOf = (req, res) => {
  //checked
  const id = req.params.id;

  Offre.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Offre with id=${id}. Maybe Offre was not found!`,
        });
      } else {
        res.send({
          message: "Offre was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Offre with id=" + id,
      });
    });
};
