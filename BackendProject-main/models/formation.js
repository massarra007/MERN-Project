import mongoose from 'mongoose';
const formationSchema = mongoose.Schema({
nom:  String, 
idenseignant: [{ type: mongoose.Schema.ObjectId, ref: 'Enseignant' }],

});
const  formation= mongoose.model('formation', formationSchema);
export default formation; 