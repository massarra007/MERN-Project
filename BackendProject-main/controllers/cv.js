import Cv from "../models/cv.js";
//checked
export const createCv = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const cv = new Cv(req.body);

    const saved_Cv = await cv.save(cv);
    if (!saved_Cv) {
      return res.status(500).send({
        message: "Some error occurred while creating the CV.",
      });
    }
    return res.status(200).send(cv);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the CV.",
    });
  }
};

//checked
export const getAllCv = async (req, res) => {
  try {
    const cv = await Cv.find();

    res.status(200).json(cv);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCv = async (req, res) => {
  //checked
  const id = req.params.id;

  try {
    await Cv.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCVByUser = async (req, res) => {
  const { firstname, lastname } = req.query;

  try {
    const cv = await Cv.findOne({
      firstname: firstname,
      lastname: lastname,
    }); 

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.json(cv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getCvByIdUser = async (req, res) => {
  try {
    const cv = await Cv.findOne({ iduser: req.params.iduser });
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    return res.status(200).json(cv);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

//checked
export const updateCv = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.iduser;

  // Use the findOneAndUpdate method to find the CV by the iduser and update its data
  Cv.findOneAndUpdate({ iduser: id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update CV with iduser=${id}. Maybe CV was not found!`,
        });
      } else res.send({ message: "CV was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CV with iduser=" + id,
      });
    });
};

export const updateCV = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const id = req.params.id;

  Cv.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update CV with id=${id}. Maybe CV was not found!`,
        });
      } else {
        res.send({ message: "CV was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CV with id=" + id,
      });
    });
};

export const updateCvMode = async (req, res) => {
  const id = req.params.id;

  try {
    const cv = await Cv.findById(id);

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    cv.mode = 'dark';
    const updatedCv = await cv.save();

    return res.status(200).json({ message: 'CV mode updated to dark', cv: updatedCv });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the CV mode' });
  }
};