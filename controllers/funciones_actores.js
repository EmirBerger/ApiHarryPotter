import Actores from "../models/actores_model.js";

async function actualizarActor(body, _id){
    let actor = await Actores.updateOne({_id: _id},{
        $set: {
            nombre: body.nombre,
            apellido: body.apellido,
            genero:body.genero,
            fechaNacimiento:body.fechaNacimiento,
            imagen:body.imagen
        }
    })
    return actor;
}
async function crearActor(body){
    let actor = new Actores({
        id:body.id,
        nombre:body.nombre,
        apellido:body.apellido,
        genero:body.genero,
        fechaNacimiento:body.fechaNacimiento,
        imagen: body.imagen
    })
    return await actor.save();
}
async function listaActores(){
    let actores = await Actores.find();
    return actores;
}
async function actorId(id){
    let actor = await Actores.find({id: id});
    return actor;
}
async function actorNombre(nombre){
    let actor = await Actores.find({nombre: nombre});
    return actor;
}
async function eliminarAcotor(_id){
    let resultado = await Actores.deleteOne({_id: _id});
    return resultado;
}
async function ordenAscendentePorId() {
    const actores = await listaActores();
    return actores.sort((a, b) => a.id - b.id);
}
async function ordenDescendentePorId() {
    const actores = await listaActores();
    return actores.sort((a, b) => b.id - a.id);
}
async function filtroAño(fechaNacimiento){
    let AñoBuscado = await Actores.find({fechaNacimiento: fechaNacimiento});
    return AñoBuscado;
}
async function filtroGenero(genero){
    let generoBuscado = await Actores.find({genero: genero});
    return generoBuscado;
}

export {actualizarActor,crearActor,listaActores, actorId, actorNombre, eliminarAcotor, ordenAscendentePorId, ordenDescendentePorId,filtroAño, filtroGenero};