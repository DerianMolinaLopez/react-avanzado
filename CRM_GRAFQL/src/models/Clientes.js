import moongose,{Schema} from 'mongoose';
const ClienteSchema = Schema({
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
      empresa:{
        type:String,
        trim:true,
        required:true
      },
      contacto:{
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
      creado:{
        type:Date,
        default:Date.now()
      },
      vendedor:{
        type:moongose.Schema.Types.ObjectId,//--> guardamos como tipo usuario para mas adelante hacer union de datos
        required:true,
        ref:'Usuario'
      }
})
const Cliente = moongose.model('Cliente',ClienteSchema)
export default Cliente