import mongoose from "mongoose";


 const ordenSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,

    },
    descripcion:{
        type: String,
        required: true,
        trim: true,
    },
    date:{
        type: Date,
        default: Date.now,

    },
    type:{
        type: String,
        required: true,
        trim: true,
    },
    priority:{
        type: String,
        required: true,
        trim: true,
    
    }
    

},{
    timestamps:true
});

export default mongoose.model("Orden", ordenSchema, "ordenes");
