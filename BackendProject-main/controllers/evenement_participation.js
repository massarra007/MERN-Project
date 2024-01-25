import Evenement_participation from "../models/evenement_participation.js";
//checked

export const create = async (req, res) => {
    try {
      // Validate request
      if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
  
      const EventParticipation = new Evenement_participation(req.body);
  
      const saved_Event = await EventParticipation.save(EventParticipation);
      if (!saved_Event) {
        return res.status(500).send({
          message: "Some error occurred while creating the Event.",
        });
      }
      return res.status(200).send(EventParticipation);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Demande.",
      });
    }
  };

export const findAll = async (req, res) => {
    try {
      await Evenement_participation.find({}).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
export const findOne = async (req, res) => {
const id = req.params.id;
  
    try {
      await Evenement_participation.findById(id).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
export const update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Evenement_participation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Event with id=${id}. Maybe Event was not found!`,
          });
        } else res.send({ message: "Event was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Event with id=" + id,
        });
      });
  };
  
export const deleteOf = (req, res) => {
    const id = req.params.id;
  
    Evenement_participation.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
          });
        } else {
          res.send({
            message: "Event was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Event with id=" + id,
        });
      });
  };
  