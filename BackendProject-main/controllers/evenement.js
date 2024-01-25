import Event from "../models/evenements.js";

export const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const evt = new Event(req.body);

    const saved_Event = await evt.save(evt);
    if (!saved_Event) {
      return res.status(500).send({
        message: "Some error occurred while creating the Event.",
      });
    }
    return res.status(200).send(evt);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Event.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    await Event.find({}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const findAllEvent = async (req, res) => {

  try {
    console.log("ff", req.params.annee);

    await Event.find({saison:req.params.annee}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};


export const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    await Event.findById(id).then((result) => {
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

  Event.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

export const deleteEv = (req, res) => {
  const id = req.params.id;

  Event.findByIdAndRemove(id)
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
