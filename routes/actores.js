import express from "express";
import {actualizarActor,crearActor,listaActores, actorId, actorNombre, eliminarAcotor, ordenAscendentePorId, ordenDescendentePorId,filtroAño, filtroGenero} from "../controllers/funciones_actores.js"

const ruta = express.Router();

ruta.get("/", (req, res) => {
    let resultado = listaActores();
    resultado.then(actores => {
        res.json(actores)
    }).catch(err => {
        res.status(400).json({err})
    })
})
ruta.get('/:id', (req, res) => {
    const id = req.params.id;
    actorId(id)
        .then(actor => {
            if (actor) {
                res.json(actor);
            } else {
                res.status(400).json({ error: "Actor no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({ err });
        });
})
ruta.get('/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    actorNombre(nombre)
        .then(actor => {
            if (actor) {
                res.json(actor);
            } else {
                res.status(400).json({ error: "Actor no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({ err });
        });
})
ruta.get('/orden/ascendente', (req, res) => {
    ordenAscendentePorId()
        .then(actores => {
            res.json(actores);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});
ruta.get('/orden/descendente', (req, res) => {
    ordenDescendentePorId()
        .then(actores => {
            res.json(actores);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
})
ruta.get('/nacimiento/:fechaNacimiento', (req, res) => {
    const año = req.params.fechaNacimiento;
    filtroAño(año)
        .then(datos => {
            if (datos) {
                res.json(datos);
            } else {
                res.status(400).json({ error: "Actor no encontrado" });
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
                res.status(400).json({ error: "Actor no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({ err });
        });
})
ruta.post('/',(req,res)=>{
    let body = req.body;
    let resultado = crearActor(body);
    resultado.then(pers =>{
        res.json({
            valor: pers
        })
    }).catch(err =>{
        res.status(400).json({err})
    })
})
ruta.put("/editar/:_id", (req, res)=>{
    let resultado = actualizarActor(req.body, req.params._id);
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
    eliminarAcotor(id)
        .then(resultado => {
            if (resultado.deletedCount > 0) {
                res.json({ message: "Actor eliminado con éxito" });
            } else {
                res.status(404).json({ error: "Actor no encontrado" });
            }
        })
        .catch(err => {
            res.status(400).json({err})
        });
})

export default ruta;