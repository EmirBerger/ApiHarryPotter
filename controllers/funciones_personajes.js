import Personaje from "../models/personajes_model.js";

async function actualizarPersonaje(body, _id){
    let personaje = await Personaje.updateOne({_id: _id},{
        $set: {
            nombre: body.nombre,
            apellido: body.apellido,
            casa: body.casa,
            fechaNacimiento:body.fechaNacimiento,
            imagen: body.imagen
        }
    })
    return personaje;
}
async function crearPersonaje(body){
    let personaje = new Personaje({
        id:body.id,
        nombre: body.nombre,
        apellido: body.apellido,
        casa: body.casa,
        fechaNacimiento:body.fechaNacimiento,
        imagen: body.imagen
    })
    
    return await personaje.save();
}
async function listaPersonajes(){
    let personajes = await Personaje.find();
    return personajes;
}
async function personajeId(id){
    let personaje = await Personaje.find({id: id});
    return personaje;
}
async function personajeNombre(nombre){
    let personaje = await Personaje.find({nombre: nombre});
    return personaje;
}
async function eliminarPersonaje(_id){
    let resultado= await Personaje.deleteOne({_id: _id});
    return resultado;
}
async function ordenAscendentePorId() {
    const personajes = await listaPersonajes();
    return personajes.sort((a, b) => a.id - b.id);
}
async function ordenDescendentePorId() {
    const personajes = await listaPersonajes();
    return personajes.sort((a, b) => b.id - a.id);
}
async function filtroCasa(casa){
    let casaBuscada = await Personaje.find({casa: casa});
    return casaBuscada;
}
async function filtroGenero(genero){
    let generoBuscada = await Personaje.find({genero: genero});
    return generoBuscada;
}

export {actualizarPersonaje, crearPersonaje, listaPersonajes, personajeId, personajeNombre, eliminarPersonaje,ordenAscendentePorId,ordenDescendentePorId,filtroCasa,filtroGenero};