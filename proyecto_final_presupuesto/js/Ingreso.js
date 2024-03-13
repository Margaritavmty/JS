import Dato from "./Dato.js";

class Ingreso extends Dato {

    static contadorIngresos = 0;

    _data = new WeakMap();//se utiliza para almacenar pares clave-valor 

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._data.set(this, {
            id: Ingreso.contadorIngresos
        });
        Ingreso.contadorIngresos++;
    }

    get id() {
        return this._data.get(this).id;
    }

}

export default Ingreso;