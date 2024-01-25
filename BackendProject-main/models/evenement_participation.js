import mongoose from 'mongoose' ;

const Evenement_participationSchema = mongoose.Schema(
  {
    idEvenement: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Evenement' 
    },
    idAlumni: {
         type: mongoose.Schema.ObjectId, 
         ref: 'Alumni' 
    },
    status: {
        type: Boolean,
        required: true,
    },
    
   

})

const  Evenement_participation= mongoose.model('Evenement_participation', Evenement_participationSchema);
export default Evenement_participation;