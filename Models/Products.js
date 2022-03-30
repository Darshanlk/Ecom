import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    mediaUrl:{
        type:String,
        required:true
    },
    productBy:{
        type:ObjectId,
        ref: "User",
    }
    

});


export default  mongoose.models.product || mongoose.model("product",productSchema)
// if we use this model in another file it gives error so we use || operator  so we directly use this model 