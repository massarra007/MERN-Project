import Enseignant from "../models/enseignant.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Formation from "../models/formation.js";
import Alumins from "../models/alumnis.js";
import Users from "../models/users.js";

//checked
export const signupEnseignant = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    responsableforrmation,
    idformation,
    password,
  } = req.body;
  try {
    const enseignatexist = await Enseignant.findOne({ phone });

    if (enseignatexist)
      return res.status(400).json({ message: "Enseignant existant déja !" });
    const hashedpassword = await bcrypt.hashSync(password, 12);
    const result = await Enseignant.create({
      firstname,
      lastname,
      phone,
      responsableforrmation,
      idformation,
      password: hashedpassword,
    });
    //console.log("ici");
    const token = jwt.sign({ phone: result.phone, id: result._id }, "test", {
      expiresIn: "1d",
    });

    let tabFormations = [];
    const formations = await Formation.find({ _id: { $in: idformation } });
    formations.map(async (el) => {
      tabFormations.push(el._id);
    });
    await Formation.updateMany(
      { _id: { $in: tabFormations } },
      { $push: { idenseignant: result._id } }
    );
    await Enseignant.updateOne({ $push: { idformation: result.idformation } });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "erreur " });
    console.log(error.message);
  }
};

//checked
export const signin = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const enseignant = await Enseignant.findOne({ phone });

    if (enseignant) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        enseignant.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "mot de passe incorrect" });
      res.status(200).json({ result: enseignant });
    }
  } catch (err) {
    res.status(500).json({ message: "il ya une erreur" });
  }
};

//checked
export const Statistiqueenseignant = async (req, res) => {
  try {
    const enseignantsCount = await Enseignant.countDocuments();
    if (enseignantsCount) {
      res.send({
        enseignantsCount: enseignantsCount,
      });
    }
  } catch (err) {
    res.status(500).send(error);
  }
};

//checked
export const updateEnseignant = async (req, res) => {
  try {
    const id = req.query.id;
    const _id = id;

    const enseignant = req.body;

    const updateEnseignant = await Enseignant.findByIdAndUpdate(
      _id,
      { ...enseignant, _id },
      { new: true }
    );
    res.json(updateEnseignant);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

//checked
export const getEnseignant = async (req, res) => {
  //checked
  try {
    const enseignant = await Enseignant.find();

    res.status(200).json(enseignant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//checked
export const deleteEnseignant = async (req, res) => {
  try {
    const id = req.query.id;
    const enseignant = await Enseignant.find({ _id: { $in: id } });
    enseignant.map(async (el) => {
      await Enseignant.findByIdAndRemove(el._id);
    });

    res.json({ message: "l'enseignant a ete supprimer avec succés !" });
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
export const listAlumnis = async (req, res) => {
  const alumniList = await Alumins.find({ demande: false });
  const alumniLists = {};
  for (const alumni of alumniList) {
    if (!alumniLists[alumni.report]) {
      alumniLists[alumni.report] = [];
    }
    alumniLists[alumni.report].push(alumni);
  }
  res.status(200).json(alumniLists);
};
export const acceptAlumni = async (req, res) => {
  const id = req.query.id;
  await Alumins.findById(id).then((rechAlumn) => {
    console.log(rechAlumn);
  });

  const rechAlumni = {
    firstname: rechAlumn.firstname,
    lastname: rechAlumn.lastname,
    login: rechAlumn.login,
    password: rechAlumn.password,
    email: rechAlumn.email,
    phone: rechAlumn.phone,
    Birth_date: rechAlumn.Birth_date,
    Cv: rechAlumn.cv,
    pays: rechAlumn.pays,
    societe: rechAlumn.societe,
    promotion: rechAlumn.promotion,
    date_diplome: rechAlumn.date_diplome,
    date_embauche: rechAlumn.date_embauche,
  };
  const userexist = await Users.findOne({
    phone: rechAlumni.phone,
    email: rechAlumni.email,
  });
  if (!rechAlumn) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if (userexist) {
    res.status(400).send({ message: "Cet Alumni existe déjà" });
    return;
  } else {
    const etd = new Users();
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass = bcrypt.hashSync(rechAlumn.password, salt);
    etd.password = cryptedPass;
    const saved_user = await etd.save(etd);
    alumni
      .findByIdAndUpdate(id, { demande: true }, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
          });
        } else res.send({ message: "Alumni was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updating user with id=" + id });
      });
    if (!saved_user) {
      return res.status(500).send({
        message: "Some error occurred while creating this user.",
      });
    }
    return res.status(200).send(etd);
  }
};
export const acceptee = async (req, res) => {
  const data = {
    demande: true,
  };
  const id = req.params.id;
  try {
    await Alumins.findById(id).then((result) => {
      const item = {
        firstname: result.firstname,
        lastname: result.lastname,
        login: result.login,
        password: result.password,
        email: result.email,
        phone: result.phone,
        Birth_date: result.Birth_date,
        Cv: "",
        pays: result.pays,
        societe: result.societe,
        promotion: result.promotion,
        date_diplome: result.date_diplome,
        date_embauche: result.date_embauche,
        role: "alumni",
      };
      console.log("item", item);
      const salt = bcrypt.genSaltSync(10);
      const cryptedPass = bcrypt.hashSync(item.password, salt);
      item.password = cryptedPass;
      const etd = new Users(item);
      const saved_etudiant = etd.save(etd);
      Alumins.findByIdAndUpdate(id, data, { useFindAndModify: false })
        .then((item) => {
          if (!item) {
            console.log(
              `Cannot update user with id=${id}. Maybe user was not found!`
            );
          } else {
            console.log("message: user was updated successfully.");
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating user with id=" + id,
          });
        });

      if (!saved_etudiant) {
        return res.status(500).send({
          message: "Some error occurred while creating the Student.",
        });
      }
      return res.status(200).send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
export const reportAlumnis = async (req, res) => {
  const data = {
    report: true,
  };

  const id = req.params.id;

  Alumins.findByIdAndUpdate(id, data, { useFindAndModify: false })
    .then((item) => {
      if (!item) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else {
        //success lazem nthabet ml item chniya fiha

        res.send({ message: "user was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};
