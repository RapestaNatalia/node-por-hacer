const fs= require('fs');

let listadoPorHacer =[];

const crear= (descripcion) =>{
     cargarDB();
    let porHacer={
        descripcion,
        completado:false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return listadoPorHacer;
}
const guardarDB =()=>{
    let data=JSON.stringify(listadoPorHacer);

        fs.writeFile('db/data.json', data, (err) => {
            if (err) throw new Error('No se puede grabar',err);
        });
            
    
}
const getListado = () =>{
    cargarDB();
    return listadoPorHacer;
}
const actualizar =(descripcion,completado=true)=>{
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >=0){
        listadoPorHacer[index].completado=completado;
        guardarDB();
        return true;
    }else{
        return false;
    }
}
const cargarDB = () =>{
    try{
        listadoPorHacer = require('../db/data.json');
    }catch(error){

    }
}
const borrar= (descripcion) =>{
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >=0){
        //ademas de splice se podria haber usado filter
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    }else{
        return false;
    }
}
module.exports={
    crear,
    getListado,
    actualizar,
    borrar
}