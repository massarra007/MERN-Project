import mongoose from 'mongoose' ;

const DirecteursSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
})

const  Directeurs= mongoose.model('Directeur', DirecteursSchema);
export default Directeurs;