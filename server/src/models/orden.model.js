// Se importa mongoose para definir el esquema y el modelo.
import mongoose from "mongoose";

// Se define el esquema para los documentos de la colección de órdenes.
const ordenSchema = new mongoose.Schema({
    // Este campo es crucial para la relación entre órdenes y usuarios.
    user:{
        // El tipo es un ObjectId, que es el formato de los IDs de MongoDB.
        type: mongoose.Schema.Types.ObjectId,
        // `ref: "User"` le dice a Mongoose que este campo se refiere a un documento del modelo 'User'.
        // Esto permite usar la función `.populate()` para traer los datos del usuario asociado.
        ref: "User",
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true, // Elimina espacios en blanco.
    },
    descripcion:{
        type: String,
        required: true,
        trim: true,
    },
    date:{
        type: Date,
        default: Date.now, // Si no se especifica una fecha, se usará la fecha actual por defecto.
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
    timestamps: true // Añade los campos `createdAt` y `updatedAt`.
});

// Se exporta el modelo 'Orden'.
// El tercer argumento, "ordenes", fuerza a que la colección en MongoDB se llame exactamente así.
// Si no se especifica, Mongoose lo pluralizaría a "ordens".
export default mongoose.model("Orden", ordenSchema, "ordenes");
