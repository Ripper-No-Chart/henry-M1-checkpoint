## Explica los siguentes conceptos con tus propias palabras. (no más de tres líneas por respuesta).

* Estructura de Datos:
    Las estructuras de datos son un medio para manejar grandes cantidades de datos de manera eficiente para usos tales como grandes bases de datos y servicios de indización.

* Lista Enlazada:
    Es un tipo de dato autorreferenciado que contienen un puntero, a otro dato del mismo tipo. Permiten inserciones y eliminación de nodos en cualquier punto de la lista en tiempo constante.

* Árbol:
    Es un tipo abstracto de datos que imita la estructura jerárquica de un árbol, con un valor en la raíz y subárboles con un nodo padre, representado como un conjunto de nodos enlazados.

* Closures:
    Un closure es cuando una función es capaz de recordar y acceder a un lexical scope, incluso cuando la función es ejecutada por fuera del lexical scope.

* Contexto de Ejecución:
    Es un concepto abstracto que contiene información sobre el entorno dentro del cual se está ejecutando el código actual.

* Variable THIS:
    Es una palabra clave de js y hace referencia al objeto mismo en el que pertenece.
    Ej: LinkedList.prototype.size = function () {
            return this.listSize;
        };

* Hoisting:
    Es un mecanismo donde las variables y las declaraciones de funciones se mueven a la parte superior de su alcance antes de la ejecución del código

* Pasar por valor y por referencia:
    Al asignar Boolean, Null, Undefined, Number, String y Symbol, el valor asignado es una copia del valor que estamos asignando. Pero cuando asignamos valores NO primitivos o complejos como Object, Array y Function, js copia la referencia, esto hace que no se copia el valor en sí, si no una referencia a través de la cual accedemos al valor original.

* Algoritmo:
    Es un conjunto de instrucciones o reglas definidas, ordenadas y finitas que permite, típicamente, solucionar un problema, realizar un cómputo o procesar datos entre otras cosas.

* Big O notation:
    Es un metodo que se usa para clasificar a los algoritmos de acuerdo a cómo crecen sus requisitos de tiempo de ejecución.

* Inmediatly Invoked Function Expression (IIFF):
    Son las funciones autoinvocadas. Se llaman con () para autoejecutarse.
    Ej: (function () {
        alert('Henry');
    })();