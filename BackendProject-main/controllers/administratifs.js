import Administratifs from "../models/administratifs.js";

export const findOne = async (req, res) => {
    const id = req.params.id;
  
    try {
      await Administratifs.findById(id).then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  /* export const signin = async (req, res) => {
    const {  phone, password } = req.body;
    try {
      const administratif = await Administratifs.findOne({ phone });
  
      if (administratif) {
        const isPasswordCorrect = await bcrypt.compare(password, administratif.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "mot de passe incorrect" });
        res.status(200).json({ result: administratif });
      }
        
    } catch (err) {
      res.status(500).json({ message: "il ya une erreur" });
    }
}; */


export const update = (req, res) => {
    router.put('/:id',async (req, res)=> {

   if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Administratifs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Administratif with id=${id}. Maybe Administratif was not found!`,
          });
        } else res.send({ message: "Administratif was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Administratif with id=" + id,
        });
      });
})
}
export const updateAdmin = async (req, res) => {
    try {
    const id = req.query.id;
    const _id = id;
  
    const admin = req.body;
  
    const updateAdmin= await Administratifs.findByIdAndUpdate(
      _id,
      { ...admin, _id },
      { new: true }
    );
    res.json(updateAdmin);
    }
    catch(error) {
      res.status(404).json({message: error.message});
      console.log(error.message)
    }
  };
  
export const deleteAdmin = (req, res) => {
    const id = req.params.id;
  
    Administratifs.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Administratif with id=${id}. Maybe Administratif was not found!`,
          });
        } else {
          res.send({
            message: "Administratif was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Administratif with id=" + id,
        });
      });
  };
 /* 
export const deleteAll = (req, res) => {
    Administratifs.deleteMany({})
      .then((data) => {
        res.send({
          message: `${data.deletedCount} Administratif were deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Administratifs.",
        });
      });
  };
  */