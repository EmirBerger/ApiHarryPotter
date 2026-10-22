import express from "express";
import {actualizarPersonaje, crearPersonaje,listaPersonajes, personajeId, personajeNombre, eliminarPersonaje,ordenAscendentePorId,ordenDescendentePorId,filtroCasa,filtroGenero} from "../controllers/funciones_personajes.js";
import Joi from 'joi';
const schema = Joi.object({
    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required(),
    apellido: Joi.string()
        .alphanum()
        .min(3)
        .max(40)
        .required()
})

const ruta = express.Router();

ruta.get("/", (req, res) => {
    let resultado = listaPersonajes();
    resultado.then(personajes => {
        res.json(personajes)
    }).catch(err => {
        res.status(400).json({err})
    })
})
ruta.get('/:_id', (req, res) => {
    const id = req.params._id;
    personajeId(id)
        .then(personaje => {
            if (personaje) {
                res.json(personaje);
            } else {
                res.status(400).json({ error: "Personaje no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({ err });
        });
})
ruta.get('/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    personajeNombre(nombre)
        .then(personaje => {
            if (personaje) {
                res.json(personaje);
            } else {
                res.status(400).json({ error: "Personaje no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({ err });
        });
})
ruta.get('/orden/ascendente', (req, res) => {
    ordenAscendentePorId()
        .then(personajesOrdenados => {
            res.json(personajesOrdenados);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});
ruta.get('/orden/descendente', (req, res) => {
    ordenDescendentePorId()
        .then(personajesOrdenados => {
            res.json(personajesOrdenados);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
})
ruta.get('/casa/:casa', (req, res) => {
    const casa = req.params.casa;
    filtroCasa(casa)
        .then(datos => {
            if (datos) {
                res.json(datos);
            } else {
                res.status(400).json({ error: "Personaje no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({ err });
        });
})
ruta.get('/genero/:genero', (req, res) => {
    const genero = req.params.genero;
    filtroGenero(genero)
        .then(datos => {
            if (datos) {
                res.json(datos);
            } else {
                res.status(400).json({ error: "Personaje no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({ err });
        });
})
ruta.post('/',(req,res)=>{
    let body = req.body;
    const {error, value} = schema.validate({
        nombre: body.nombre,
        apellido:body.apellido
    })
    if(!error){
        let resultado = crearPersonaje(body);
        resultado.then(pers =>{
            res.json({
                valor: pers
            })
        })
        .catch(err =>{
            res.status(400).json({err})
        })
    }else{
        res.status(400).json({error})
    }
    
})
ruta.put("/editar/:_id", (req, res)=>{
    let resultado = actualizarPersonaje(req.body, req.params._id);
    resultado
    .then(valor  =>{
        res.json({
            valor
        })
    })
    .catch(err => {
        res.status(400).json({err})
    })
})
ruta.delete('/eliminar/:_id', (req, res)=> {
    const id = req.params._id;
    eliminarPersonaje(id)
        .then(resultado => {
            if (resultado.deletedCount > 0) {
                res.json({ message: "Personaje eliminado con éxito" });
            } else {
                res.status(404).json({ error: "Personaje no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({err})
        });
})

export default ruta;