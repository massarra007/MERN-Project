import mongoose from 'mongoose' ;

const EvenementSchema = mongoose.Schema(
  {
    eventName: {
        type: String,
        required: true,
      },
      eventDate: {
        type: Date,
        required: true,
      },
      eventType: {
        type: String,
        enum: ["JPO", "Journée d'integration", "Formation"],
        default: "JPO",
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
        default: "isamm",
      },
saison:{
  type:String,
  required:false
}
 

   

})

const  Evenement= mongoose.model('Evenement', EvenementSchema);
export default Evenement;