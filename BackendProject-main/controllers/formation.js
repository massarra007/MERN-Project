import Formation from "../models/formation.js";
//checked
export const createFormation = async (req, res) => {
    const {
        nom,
      /*  idenseignant,*/
     }=req.body
    
        const newFormation = new Formation({
            nom,
           /* idenseignant,*/
        });
        try {
         
          await newFormation.save((err,) => {
            if (err) return res.status(400).json({ message:" Error "});
          })
          res.status(200).json({ message: "formation créer avec succès, Merci "});
               
        } 
        catch (err) {
          res.status(500).json({ message: err.message });
        }
 }

//checked
export const getFormation = async (req,res) => {
        try {
         
          const formation = await Formation.find();
         
          res.status(200).json(
            formation
                 );
        } catch (error) {
          res.status(404).json({ message: error.message });
    
        };
 };

//checked
export const deleteFormation = async (req, res) => {
        try {
        const  id  = req.query.id;
        const formation = await Formation.find({_id: {$in: id}});
    formation.map(async(el)=>{
      await Formation.findByIdAndRemove(el._id);
   
    })
       
        
        res.json({ message: "la formation a ete supprimer avec succés !" });
        }catch (error) {
          res.status(404).json({ message: error.message });
          console.log(error.message)
        }
     };