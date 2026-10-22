import express from "express";
import Personaje from "../models/personajes_model.js";
import "dotenv/config";
import bcrypt from "bcrypt";

const ruta = express.Router();

ruta.post("/",(req, res)=>{
    Personaje.findOne({nombre: req.body.nombre})
    .then(datos =>{
        if(datos){
            const nombreValido = bcrypt.compareSync(req.body.nombre, datos.nombre);
            if(!nombreValido) return res.status(400).json({
                    msj: "Nombre Incorrecto."
                })
            res.json({datos})
        }else{
            res.status(400).json({
                msj: "Nombre incorrecto."
            })
        }
    }).catch(err =>{
        res.status(400).json({
            msj: "Error de servicio."
        })
    })
})

export default ruta;