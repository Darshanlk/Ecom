import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const sellCartSchema = new mongoose.Schema({
  user:{
    type:ObjectId,
    ref:"User"
},
products:[
    {
        quantity:{type:Number,default:1},
        product:{type:ObjectId,ref:"product"}
   }
]
});



export  default mongoose.models.SellCart || mongoose.model("SellCart",sellCartSchema)