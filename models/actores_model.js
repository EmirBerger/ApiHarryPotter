import mongoose from "mongoose";

const actoresSchema = new mongoose.Schema({
    id:{
        type: Number,
        require: true
    },
    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    genero:{
        type: String,
        require: true
    },
    fechaNacimiento:{
        type: String,
        require: true
    },
    imagen:{
        type: String,
        require: true
    }
})

export default mongoose.model("Actores",actoresSchema);