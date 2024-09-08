import moongose,{Schema} from 'mongoose';

const usuariosSchema =Schema({
  nombre:{
    type:String,
    trim:true,
    required:true
  },
  apellido:{
    type:String,
    trim:true,
    required:true
  },
  email:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  password:{
    type:String,
    trim:true,
    required:true
  },

},{createAt:true,updateAt:true})

const Usuario = moongose.model('Usuario',usuariosSchema)
export default Usuario