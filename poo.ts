/** Crear interfaces y clases para definir esta situación:

Tenemos una ciudad con varias CASAS , estas pueden ser compradas por distintas PERSONAS.
 De las casas necesitamos guardar la información de su superficie, precio, número de habitaciones, número de baños, tipo de casa (chalet, piso o duplex),
 si la casa está en venta, y su propietario/s en caso de que los tenga.
 De las personas necesitamos conocer su nombre, su edad, el dinero del que disponen, su DNI y su estado civil,
 en caso de que las personas estén casadas además necesitamos conocer su pareja.

Habrá 2 acciones que sea posible realizar: 

- Comprar una casa: En caso de que una casa sea adquirida deberá dejar de estar en venta y se deberá registrar su propietario o propietarios.
- Casarse: 2 personas podrán casarse si no están ya casados con otra persona. Se deberá registrar su nueva pareja y cambiar su estado civil.

Se deberán crear las clases e interfaces necesarias para poder definir las distintas personas y casas.
Además las clases deberán contener los métodos necesarios para que se puedan realizar las acciones descritas.
Se deberá intentar utilizar tipos personalizados y herencia de clases. */

import { runInThisContext } from "vm";

/** Enumeración con los tipos de casa, completar */
enum TipoCasa {
    CHALET = 'chalet',
    PISO = 'piso',
    DUPLEX = 'duplex'
}

/** Enumeración con los tipos de estado civil, completar */
enum EstadoCivil {
    CASADO = 'casado',
    SOLTERO = 'soltero'
}

/** Interfaz Casa, completar con el resto de información necesaria */
interface CasaInterface {
    precio: number;
    tipoCasa: TipoCasa;
    superficie: number;
    numeroHabitaciones: number;
    numeroBaños: number;

    /** Lista con los propietario/s */
    propietarios: Persona[];
    enVenta: boolean;
}

/** Interfaz persona completar con el resto de información necesaria */
interface PersonaInterface {
    nombre: string;
    edad: number;
    dineroDisponible: number;
    estadoCivil: EstadoCivil;
    
    
    DNI: string;
}

/** Clase casa, completar con atributos que faltan */
class Casa implements CasaInterface {
    precio: number;
    tipoCasa: TipoCasa;
    superficie: number;
    numeroHabitaciones: number;;
    numeroBaños: number;
    propietarios: Persona[];
    enVenta: boolean;

    constructor(superficie:number, precio: number, numeroHabitaciones:number, numeroBaños:number, tipoCasa: TipoCasa, propietarios: Persona[]) {
        this.precio = precio;
        this.tipoCasa = tipoCasa;
        this.superficie = superficie;
        this.numeroHabitaciones = numeroHabitaciones;
        this.numeroBaños = numeroBaños;
        // La casa empieza sin propietarios
        this.propietarios = propietarios;
        // La casa al principio está en venta
        this.enVenta = true;
    }
    

    /** Función para comprar una casa, añadir lógica para que no se compre una casa si los compradores no disponen del dinero suficiente */
    comprar(compradores: Persona[]) {

        let dineroDisponible: number = compradores.reduce((a,b) => b.dineroDisponible + a, 0);
        // Si está en venta se permite comprarla (añadir condición para que los compradores tengan el dinero)
        // y restar de su dinero el precio de la casa si la compran.
        
        if (!this.enVenta) { return console.log ("ERROR: La casa no está en venta")}
        
        else if (dineroDisponible < this.precio){
            return console.log("ERROR: No hay fondos disponibles.")
        }

        else {
            const antiguosPropietarios = [...this.propietarios];

            //actualizo estado de los propietarios
            this.propietarios = [...compradores];

            //actualizo estado de la casa
            this.enVenta = false; 

            //mensaje de confirmación

            const nombreCompradores: string[] = compradores.map((pers) => pers.nombre)
            console.log(`${nombreCompradores.join(",")} han comprado la vivienda`)

            //Descuento del precio de la vivienda

            let coste: number = this.precio;

            compradores.forEach((comprador) => {
                if (comprador.dineroDisponible <= coste){
                    coste -= comprador.dineroDisponible
                    comprador.dineroDisponible = 0;
                }else{
                    comprador.dineroDisponible -= coste;
                    coste=0;
                }
            });

            if (antiguosPropietarios.length > 0){
                const dineroCompra = this.precio / antiguosPropietarios.length;
                    antiguosPropietarios.forEach((dineroTotal) => {
                        dineroTotal.dineroDisponible += dineroCompra;
                    } )
                };
            }
        }
        
        
}

/** Clase persona, completar con atributos y constructor */
class Persona implements PersonaInterface {
    nombre: string;
    edad: number;
    dineroDisponible: number;
    estadoCivil: EstadoCivil;
    
    
    DNI: string;
    /** Opcional porque no se rellena a menos que la persona esté casada */
    pareja?: Persona;

    constructor(nombre: string,edad: number, dineroDisponible:number,DNI:string, estadoCivil: EstadoCivil ) {
        this.nombre = nombre;
        this.estadoCivil = estadoCivil;
        this.edad = edad;
        this.dineroDisponible = dineroDisponible;
        this.DNI = DNI;
    }

    /** Implementar lógica para actualizar el estado civil de ambas personas y su pareja
     * Se deberá comprobar que las 2 personas estén solteras antes de casarlos.
     */
    casarse(persona: Persona) {

        if (this.edad < 18 || persona.edad<18){
            console.log("ERROR: Ambas personas deben de ser mayores de edad");
        }

        else if (
            this.estadoCivil !== "soltero" || persona.estadoCivil !== "soltero") {
                console.log("ERROR: Ambas personas deben estar solteras");
            }
        
        else {

            //Actualizo estado civil
            this.estadoCivil = EstadoCivil.CASADO;
            persona.estadoCivil = EstadoCivil.CASADO;

            //Actualizo referencias a pareja

            this.pareja = persona;
            persona.pareja = this;

            //Genero mensaje de respuesta

            console.log(`${this.nombre} y $ (persona.nombre) se han casado`);
        }

    }
}

/** Crear las personas y casas que se desee y hacer pruebas (se valorará que se creen nuevas pruebas inventadas) */
/**
 * Este es un ejemplo de como debería funcionar el programa una vez haya sido terminado, los comentarios a la derecha de cada línea de código describen el resultado que se debe
 * mostrar al usuario por consola:
 */

 const juan: Persona = new Persona('Juan', 32, 50000, '54672398L', EstadoCivil.SOLTERO);
 const maria: Persona = new Persona('María', 34, 125000, '34568910T', EstadoCivil.SOLTERO);
 const paula: Persona = new Persona('Paula', 27, 195000, '34589921D', EstadoCivil.SOLTERO);
 const chalet1: Casa = new Casa(152, 160000, 3, 2, TipoCasa.CHALET, []);
 const piso1: Casa = new Casa(68, 60000, 2, 1, TipoCasa.PISO, []);
 
 maria.casarse(juan); // Debería funcionar correctamente.
 maria.casarse(paula); // Debería imprimir en consola el error "ERROR: La persona ya está casada".
 chalet1.comprar([juan, maria]); // Debería comprar el chalet correctamente al tener entre los dos suficiente dinero
 piso1.comprar([juan]); // ERROR: Los compradores no tienen suficiente dinero para adquirir esta casa.
 
 console.log(juan.estadoCivil); // casado
 console.log(paula.estadoCivil); // soltero
 console.log(chalet1.enVenta); // false
 console.log(piso1.enVenta); //true
 
 
