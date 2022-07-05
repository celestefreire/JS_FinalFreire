let tarea
let hora
let importancia

const pocoImportante = []
const importante = []
const muyImportante = []

//CONSTRUCTOR
class TareasDiarias {
    constructor(tarea, hora, importancia) {
        this.tarea = tarea;
        this.hora = hora;
        this.importancia = importancia;
    }
}

//GUARDAR TAREAS
const guardaTareas = () => {

    let tarea = document.getElementById("tarea").value;
    let hora = document.getElementById("hora").value;
    let importancia = document.getElementById("importancia").value.toUpperCase();

    return nuevaTarea = new TareasDiarias (tarea, hora, importancia)
}

//ADMINISTRAR IMPORTANCIA
const admImportancia = () => {

let importanciaTarea = guardaTareas().importancia
let nuevaTarea = guardaTareas()

    switch (importanciaTarea) {
        case `POCO IMPORTANTE`: console.log("POCO IMPORTANTE");
                    pocoImportante.push(nuevaTarea)
        break;
        case `IMPORTANTE`: console.log("IMPORTANTE");
                    importante.push(nuevaTarea)
        break;
        case `MUY IMPORTANTE`: console.log("MUY IMPORTANTE");
                    muyImportante.push(nuevaTarea)
        break;
        default: console.log("NO INGRESO IMPORTANCIA");
        break;
    }
}

//VERIFICACION FORMULARIO VACIO
const verificarFormulario = () => {
    let valor

    if (guardaTareas() != undefined) {
        valor = true
        return valor
    } else {
        valor = false
        return valor
    }
}

//STORAGE
const guardarEnStorage = () => {

    verificarStorage()
    localStorage.setItem("importante" , JSON.stringify(importante))
    localStorage.setItem("muyImportante", JSON.stringify(muyImportante))
    localStorage.setItem("pocoImportante", JSON.stringify(pocoImportante))

}

//VERIFICAR STORAGE

const verificarStorage = () => {

    let estorage

    if (localStorage.getItem("importante" || "muyImportante" || "pocoImportante") != null) {
        estorage = JSON.parse(localStorage.getItem("importante"))
        return estorage
    } else {
        estorage = importante
        return estorage
    }
}

//SUMAR A LISTA EN DOM
const sumarAlista = () => {
    let nuevaTarea = guardaTareas();
    let importanciaTarea = guardaTareas().importancia;
    let verificar = verificarFormulario()

    if (verificar = true) {

    
    let a = document.createElement("a");
    switch (importanciaTarea) {
        case "MUY IMPORTANTE":
            a.setAttribute("class", "list-group-item list-group-item-action list-group-item-muyimportante");
            break;

        case "IMPORTANTE":
            a.setAttribute("class", "list-group-item list-group-item-action list-group-item-importante");
            break;

        case "POCO IMPORTANTE":
            a.setAttribute("class", "list-group-item list-group-item-action list-group-item-pocoimportante");
            break;

        case "":
            a.setAttribute("class", "list-group-item list-group-item-action list-group-item-dark");
            break;
        }
    a.textContent = `${nuevaTarea.tarea}`;

    a.addEventListener("click", function () {
        document.getElementById("listaTareasDiv").removeChild(a);
    });

    document.getElementById("listaTareasDiv").appendChild(a);

    admImportancia()
    guardarEnStorage()
    
} else {
    return alert("no hay tarea para guardar")
}
}

const botonTareasDiarias = document.getElementById("botonDiarias")
botonTareasDiarias.addEventListener("click", sumarAlista)


//USUARIO

let usuarix
const guardaRegistro = () => {

    usuarix = prompt ("Ingresa tu nombre")

    const h1Registro = document.getElementById("nombreUsuario")
    h1Registro.textContent = usuarix

    swal({
        title: `Bienvenidx ${usuarix}`,
        text: "Comencemos tu lista de tareas",
        icon: "success",
        className: "swalProp"
    })

}

const botonRegistro = document.getElementById("botonUsuario")
botonUsuario.addEventListener("click", guardaRegistro)


//JSON RANDOM

const obtenerConsejos = () => {
    const urlJsonLocal = "https://gist.githubusercontent.com/celestefreire/40314ab6d71044070e28abb7adf58115/raw/526c8531b8d2e89969424dd3f1b5343d8fbd2e2f/frases_perezoso.json"

    document.getElementById("btnConsejos").onclick = () => {

        fetch(urlJsonLocal)
            .then ((response) => response.json())
            .then ((info) => {
                let consejo = info.frases

                let consejoAleatorio = consejo[Math.floor(Math.random() * consejo.length)]

                document.getElementById("divConsejoAca").innerHTML=`
                <div class="divConsejo">
                <h2>${consejoAleatorio.frase}</h2>
                </div>`

            })
    }
}

obtenerConsejos()

//NOTAS PEREZOSAS

//GUARDA NOTAS

let nota
const notasPerezosas = []

const guardaNotas = () => {

Swal.fire({

    customClass: {
        container: 'swalColor',
        title: 'swalTitulo'
    },

    input: 'textarea',
    inputLabel: 'Nueva Nota',
    inputPlaceholder: 'Ingresa tu nota perezosa aquí...',
    inputAttributes: {
        'aria-label': 'Ingresa tu nota perezosa aquí...'
    },
    showCancelButton: true

    })

    .then (resultado => {
        if (resultado.value) {
            nota = resultado.value;
            agregarNotaDOM()
            admNotas()
            storageNotas()
            console.log("La nueva nota es: " + nota);
        }
    })

    
}

//STORAGE NOTAS

const admNotas = () => {
    notasPerezosas.push(nota)
}

const verificarStorageNotas = () => {

    let estorageNotas

    if (localStorage.getItem("notasPerezosas") != null) {
        estorageNotas = JSON.parse(localStorage.getItem("notasPerezosas"))
        return estorageNotas
    } else {
        estorageNotas = notasPerezosas
        return estorageNotas
    }
}

const storageNotas = () => {
    verificarStorageNotas()
    localStorage.setItem("notasPerezosas", JSON.stringify(nota))
}


//AGREGAR AL DOM

const agregarNotaDOM = () => {

let divNota = document.createElement("div")
divNota.setAttribute("class","divNotasPerezosas col-3")
divNota.setAttribute("id","divNotasPerezosas01")

let pNotas = document.createElement("p")
pNotas.setAttribute("class","txtNotaPerezosa")

pNotas.textContent = `${nota}`

let botonEliminarNota = document.createElement("button")
botonEliminarNota.textContent = `Borrar`

botonEliminarNota.addEventListener("click", function () {
    document.getElementById("notasPerezosas").removeChild(divNota)
})

divNota.appendChild(pNotas)
divNota.appendChild(botonEliminarNota)

document.getElementById("notasPerezosas").appendChild(divNota)
}


const botonNotasPerezosas = document.getElementById("botonNota")
botonNotasPerezosas.addEventListener("click",guardaNotas)