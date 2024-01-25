import mongoose from 'mongoose' ;
const enseignantSchema = mongoose.Schema ({
  firstname : {type: String, required:true},
  lastname : { type:String , required:true },
  phone : { type: String , required:true , minlength:8},
  responsableforrmation :{type:String, required:true},
  idformation:[{ type: mongoose.Schema.ObjectId, ref: 'formation' }],

  password : {
    type: String,
     required:true, 
    },
  Role :{
    type: String, 
    default: "enseignant",
},
resetLink: {
  data: String,
  default :'',
}
})
const  Enseignant= mongoose.model('Enseignant', enseignantSchema);
export default Enseignant;