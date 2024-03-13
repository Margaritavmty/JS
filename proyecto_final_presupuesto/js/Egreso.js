import Dato from "./Dato.js";// Importamos archivo "Dato"

class Egreso extends Dato {

    static contadorEgresos = 0;

    _data = new WeakMap();//se utiliza para almacenar pares clave-valor 
    
    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._data.set(this, {
            id: Egreso.contadorEgresos
        });
        Egreso.contadorEgresos++;
    }

    get id() {
        return this._data.get(this).id;
    }

};

export default Egreso;//Se utiliza para exportar la clase*/