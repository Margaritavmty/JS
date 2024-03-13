
//Se importan los datos de Ingreso y Egreso
import Ingreso from "./Ingreso.js"; 
import Egreso from "./Egreso.js";


//Definicion de Arreglos estos representan todos los ingresos y egresos de la aplicación.
const ingresoTotal = [
    new Ingreso("Salario", 20000),
    new Ingreso("trabajo freelance", 30000),
    new Ingreso("Herencia", 30000)
];

const egresoTotal = [
    new Egreso("Renta", 4000),
    new Egreso("Comida", 800),
    new Egreso("Salud", 800)
];

//Esta función calcula el presupuesto, el porcentaje de egresos, y actualiza dinámicamente 
//estos valores en el HTML del encabezado de la página.
const cargarCabecero = () => {
    const egresos = calculaEgresos();
    const ingresos = calculaIngresos();
    const presupuesto = ingresos - egresos;
    const porcentajeEgreso = egresos / ingresos;

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(ingresos);
    document.getElementById("egresos").innerHTML = formatoMoneda(egresos);
};

//Estas funciones calculan el total de egresos e ingresos respectivamente 
//sumando los valores de cada objeto en los arreglos egresoTotal e ingresoTotal
const calculaEgresos = () => {
    let totalEgresos = 0;
    egresoTotal.forEach((egreso) => {
        totalEgresos = totalEgresos + egreso.valor;
    });
    return totalEgresos;
};


const calculaIngresos = () => {
    let totalIngresos = 0;
    ingresoTotal.forEach((ingreso) => {
        totalIngresos = totalIngresos + ingreso.valor;
    });
    return totalIngresos;
};

const formatoMoneda = (number) => {
    return number.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

//Define valor de porcentaje hasta 2 digitos para que se muestre correctamente en el HTML
const formatoPorcentaje = (number) => {
    return number.toLocaleString("es-MX", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const cargarIngresos = () => {
    let ingresosHTML = "";
    ingresoTotal.forEach((ingreso) => {
        ingresosHTML = ingresosHTML + crearIngresoHTML(ingreso);
    });
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML; 
};

//funciones generan el HTML dinámico para mostrar la lista de ingresos y egresos 

//INGRESOS
const crearIngresoHTML = (ingreso) => {  //genera una cadena de texto que representa la estructura HTML
    //Parametro ingreso:  Este objeto debe tener propiedades como descripcion, valor e id que son las que se marcan en color.
    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminaIngreso(${ingreso.id})">
                        <i class="bi bi-x-circle-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};
//Genera el HTML necesario para mostrar todos los egresos en la interfaz de usuario .
const cargarEgresos = () => {
    let egresosHTML = "";
    egresoTotal.forEach((egreso) => {
        egresosHTML = egresosHTML + crearEgresoHTML(egreso);
    });
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

//EGRESOS
const crearEgresoHTML = (egreso) => {
    return `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminaEgreso(${egreso.id})">
                        <i class="bi bi-x-circle-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};

//llama la funcion desde cargar APP
//lo que permite actualizar toda la interfaz de usuario de la aplicación.
const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

const eliminaEgreso = (id) => {
    const indiceEliminar = egresoTotal.findIndex((egreso) => egreso.id == id);
    egresoTotal.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
};

const eliminaIngreso = (id) => {
    const indiceEliminar = ingresoTotal.findIndex((ingreso) => ingreso.id == id);
    ingresoTotal.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
};

//Funcion Agregar Dato
//Obtiene los valores del formulario, los valida y los agrega al arreglo correspondiente. 
const agregarDato = () => {
    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;
    const valor = document.getElementById("valor").valueAsNumber;
    if (tipo && descripcion && valor && valor > 0) {
        if (tipo == "ingresos") {
            ingresoTotal.push(new Ingreso(descripcion, valor));
        } else if (tipo == "egresos") {
            egresoTotal.push(new Egreso(descripcion, valor));
        }
        document.getElementById("forma").reset(); //se recupera formulario 
        cargarApp();
    } else {
        alert("llenar todos los campos");
    }

};

//Con esto, las funciones cargarApp, eliminaEgreso, eliminaIngreso y agregarDato estarán disponibles globalmente, 
//lo que te permitirá llamarlas desde cualquier parte de tu aplicación o desde la consola del navegador.

window.cargarApp = cargarApp;
window.eliminaEgreso = eliminaEgreso;
window.eliminaIngreso = eliminaIngreso;
window.agregarDato = agregarDato;