import mongoose from "mongoose";

const personajesSchema = new mongoose.Schema({
    id:{
        type: Number,
        require: false
    },
    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    casa:{
        type: String,
        require: true
    },
    genero:{
        type: String,
        require: false
    },
    especie:{
        type: String,
        require: false
    },
    fechaNacimiento:{
        type: String,
        require: true
    },
    wizard:{
        type: Boolean,
        require: false,
        default: true
    },
    ancestry:{
        type: String,
        require: false
    },
    patronus:{
        type: String,
        require: false
    },
    estudiante:{
        type: Boolean,
        require: false,
        default: true
    },
    personal:{
        type: Boolean,
        require: false,
        default: true
    },
    vivo:{
        type: Boolean,
        require: false,
        default: true
    },
    actor:{
        type: String,
        require: false
    },
    imagen:{
        type: String,
        require: false
    }
})

export default mongoose.model("Personajes", personajesSchema);