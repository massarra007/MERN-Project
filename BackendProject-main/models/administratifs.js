import mongoose from 'mongoose' ;

const administratifsSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },
    firstName: {
        type: String,
        required: true
      },

    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    Role :{
      type: String, 
      default: "administratif",
  },

})
const  Administratif= mongoose.model('administratif', administratifsSchema);
export default Administratif;

