import moongose,{Schema} from 'mongoose';
const PedidoSchema = Schema({
    pedido:[
    {
        id:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Producto'
        },
        cantidad:{
            type:Number,
            required:true
        }
        
    }
    ],
    total:{
        type:Number,
        required:true
    },
    cliente:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Cliente'
    },
    vendedor:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Usuario'
    },
    estado:{
        type:String,
        default:"PENDIENTE"
    },
    creado:{
        type:Date,
        default:Date.now()
    }

})
const Pedido = moongose.model('Pedido',PedidoSchema)
export default Pedido