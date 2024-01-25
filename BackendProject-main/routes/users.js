import express from "express";
const router = express.Router();
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";
import schedule from 'node-schedule';
import sendEmail from "../utils/sendEmail.js";
import multer from "multer";
import csvtojson from "csvtojson";

import {

  importExcel
} from "../controllers/etudiant.controller.js";

//const auth = require('../middlewares/auth');

// login user  --> checked
router.post("/signin", async (req, res) => {
  // data=req.body;

  const users = await Users.findOne({ phone: req.body.phone });

  if (users) {
    const validPass = bcrypt.compareSync(req.body.password, users.password);

    if (!validPass) return res.status(401).send("login or password invalid1");

    const payload = {
      _id: users._id,
      login: users.login,
    };
    const token = jwt.sign(payload, "123456");
    res.status(200).send({ mytoken: token, model: users });
  } else {
    if (!users) return res.status(404).send("login or password invalid all");
  }
 
});

//LOG OUT USER  -->checked
router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});



router.post("/create", async (req, res) => {
  //checked
  try {
    const userexist = await Users.findOne({
      phone: req.body.phone,
      email: req.body.email,
    });
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    if (userexist) {
      res.status(400).send({ message: "User exist" });
      return;
    } else {
      const etd = new Users(req.body);
      const salt = bcrypt.genSaltSync(10);
      const cryptedPass = bcrypt.hashSync(req.body.password, salt);
      etd.password = cryptedPass;

      const saved_etudiant = await etd.save(etd);
      if (!saved_etudiant) {
        return res.status(500).send({
          message: "Some error occurred while creating this user.",
        });
      }
      return res.status(200).send(etd);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating this user.",
    });
  }
});

router.put("/updatebyid/:id", async (req, res) => {
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else {
       const userup = await Users.findById(id)
       console.log(userup);
        res.send(userup) 
        
      };
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
});
router.put("/update/:id", async (req, res) => {
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else res.send({ message: "user was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
});
router.delete("/deletebyid/:id", async (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.send({
          message: "user was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
});

router.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const usrs = await Users.findById(id);
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/findol/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const usrs = await Users.findById(id);
    if (usrs.demande === false) {
      res.status(200).send("non validé");
    } else if (usrs.demande === true) {
      res.status(200).send("validé");
    } else {
      res.status(401).send("pas alumni");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Afficher liste des users --> checked
router.get("/getAllEnseignant", async (req, res) => {
  try {
    const usrs = await Users.find({ role: "enseignant" });
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Afficher liste des users --> checked
router.get("/getAllAdministartif", async (req, res) => {
  try {
    const usrs = await Users.find({ role: "directeur" });
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Afficher liste des users --> checked
router.get("/getAll", async (req, res) => {
  try {
    const usrs = await Users.find();
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Afficher liste des etudiants --> checked
router.get("/getAllEtudiant", async (req, res) => {
  try {
    const usrs = await Users.find({ role: "etudiant" });
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getAllAdministartif", async (req, res) => {
  try {
    const usrs = await Users.find({ role: "directeur" });
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Statistique users  --> checked
router.get("/getcount", async (req, res) => {
  // token of directeur
  const usersCount = await Users.countDocuments();
  if (!usersCount) {
    res.status(500).send(error);
  }
  res.send({
    usersCount: usersCount,
  });
});

router.get("/find", async (req, res) => {
  const id = req.params.id;

  try {
    const usrs = await Users.findById(id);
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/importExcel", importExcel);



router.post("/importExcel", importExcel);




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.csv'); // Set the filename for the uploaded file
  }
});

// Create an upload object
const upload = multer({ storage: storage });

// Define the route to handle file uploads
router.post('/uploadFile', upload.single('csvFile'),(req, res) => {
 // router.post('/uploadFile',(req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
  } else {
    // File uploaded successfully
    
    const csvFilePath = req.file.path;
    csvtojson()
      .fromFile(csvFilePath)
       .then((csvData) => {
         console.log(csvData);
         Users.insertMany(csvData)
           .then(function () {
             console.log("Data inserted"); //success
             res.json({ success: "success" });
            // res.send('File uploaded!');
           })
           .catch(function (error) {
             console.log(error); //failure
           });
       });
     

  }
});

router.get('/public-users', async (req, res) => {
  try {
    const users = await Users.find({ visibility: 'public', role: { $in: ['etudiant', 'alumni'] } });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

//module.exports = router;
export default router;
