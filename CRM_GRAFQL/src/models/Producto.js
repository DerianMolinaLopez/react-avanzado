import moongose,{Schema} from 'mongoose';
const ProductoSchema = Schema({
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    existencia:{
        type:Number,
        trim:true,
        required:true
    },
    precio:{
        type:Number,
        trim:true,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
    
})

const Producto = moongose.model('Producto',ProductoSchema)
export default Producto