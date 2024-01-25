import Etudiant from "../models/etudiants.js";
import csvtojson from "csvtojson";
import Etudiants from "../models/etudiants.js";
import bcrypt from "bcrypt";
import Users from "../models/users.js";
import csv from "csv-parser";
import fs from "fs";
export const create = async (req, res) => {
  //checked
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const etd = new Etudiant(req.body);
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass = bcrypt.hashSync(req.body.password, salt);
    etd.password = cryptedPass;

    const saved_etudiant = await etd.save(etd);
    if (!saved_etudiant) {
      return res.status(500).send({
        message: "Some error occurred while creating the Student.",
      });
    }
    return res.status(200).send(etd);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
};
export const findAll = async (req, res) => {
  //checked
  try {
    await Etudiant.find({}).then((result) => {
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
    await Etudiant.findById(id).then((result) => {
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

  Etudiant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Etudiant with id=${id}. Maybe Etudiant was not found!`,
        });
      } else res.send({ message: "Etudiant was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Etudiant with id=" + id,
      });
    });
};
export const deleteEt = (req, res) => {
  //checked
  const id = req.params.id;

  Etudiant.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Etudiant with id=${id}. Maybe Etudiant was not found!`,
        });
      } else {
        res.send({
          message: "Etudiant was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Etudiant with id=" + id,
      });
    });
};
export const deleteAll = (req, res) => {
  //checked
  Etudiant.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Etudiants were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Etudiants.",
      });
    });
};
export const findAllCond = (req, res) => {
  //checked
  const phone = req.query.phone;
  var condition = phone
    ? { phone: { $regex: new RegExp(phone), $options: "i" } }
    : {};

  Etudiant.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Etudiants.",
      });
    });
};
export const upload = (req, res) => {
  console.log(1);
  const file = req.body.file;
  console.log(1);
  if (!file) {
    return res.status(400).send("No file uploaded");
  }
  console.log(1);
  const results = [];
  console.log(1);
  fs.createReadStream(file.tempFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.send(results);
    });
};
export const importExcel = async (req, res) => {
  //checked
  csvtojson()
    .fromFile(req.body.url)
    .then((csvData) => {
      console.log(csvData);
      Users.insertMany(csvData)
        .then(function () {
          console.log("Data inserted"); //success
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error); //failure
        });
    });
};
export const updatePost = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Etudiant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Etudiant with id=${id}. Maybe Etudiant was not found!`,
        });
      } else res.send({ message: "Etudiant Job was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Etudiant with id=" + id,
      });
    });
};
// login etudiant -->checked
export const signin = async (req, res) => {
  // data=req.body;
  const etudiant = await Etudiants.findOne({ phone: req.body.phone });
  if (!etudiant) {
    res.status(404).send("login or password invalid");
  } else {
    const validPass = bcrypt.compareSync(req.body.password, etudiant.password);

    if (!validPass) {
      res.status(401).send("login or password invalid");
    } else {
      const payload = {
        _id: admin._id,
        login: etudiant.login,
      };
      const token = jwt.sign(payload, "123456");
      res.status(200).send({ success: true, mytoken: token, model: etudiant });
    }
  }
};
