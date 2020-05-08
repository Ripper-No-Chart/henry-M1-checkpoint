// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.

const { Queue, Node, LinkedList, BinarySearchTree } = require("./DS.js");

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función objContains: debe buscar dentro de un objeto anidado un par {clave: valor}
// especifico. Tanto el objeto como el nombre de la propiedad y su valor serán recibidos por parámetro.
// En el caso de que encuentre el valor indicado en cualquier nivel del objeto debe devolver true,
// de lo contrario, devolver false.
// Aclaraciones:
//   - Un objeto anidado es un objeto que dentro tiene uno o más objetos.
//     Ej:
//        const user = {
//            id: 6,
//            email: 'homero@maxpower.com',
//            infoPersonal: {
//                nombre: 'Homero Simpson',
//                direccion: {
//                    calle: 'Avenida Siempreviva',
//                    numero: 742,
//                    barrio: 'Springfield',
//                    estado: 'Massachusetts'
//                }
//            }
//        }
//   - Caso que devuelve true  --> objContains(user, "barrio", "Springfield");
//   - Caso que devuelve false --> objContains(user, "empleo", "Empleado en planta nuclear");
// Pista: utilizar typeof para determinar si el valor de una propiedad es un objeto para aplicar
// allí la recursión

var objContains = function (obj, prop, value) {
  for (var p in obj) {
    if (p == prop) {
      if (obj[p] == value) {
        return true;
      }
    }
    if (obj[p] instanceof Object || obj[p] instanceof Array) {
      return (result = objContains(obj[p], prop, value));
    }
  }
  return false;
};

// EJERCICIO 2
// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function (array) {
  var sum = 0;
  for (var a = 0; a < array.length; a++) {
    if (typeof array[a] == "number") {
      sum += array[a];
    } else if (array[a] instanceof Array) {
      sum += countArray(array[a]);
    }
  }
  return sum;
};

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function () {
  return this.listSize;
};

// EJERCICIO 4
// Implementar el método addInPos dentro del prototype de LinkedList que deberá agregar un elemento en
// la posición indicada. Ambos datos serán brindados como parámetro (pos, value). Donde "pos" será la
// posición en la cual se deberá agregar el valor "value". En el caso de que la posición en la que se
// quiera hacer la inserción no sea válida (Supere el tamaño de la lista actual) debe devolver false.
// Si el nodo fue agregado correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [4]
//    lista.addInPos(2, 3);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [3] --> [4]
// Ejemplo 2:
//    Suponiendo que la lista está vacía: Head --> null
//    lista.addInPos(2, 3); --> Debería devolver false ya que no es posible agregar en la posición 2
//    sin antes tener cargada la posición 0 y 1.

LinkedList.prototype.addInPos = function (pos, value) {
  // Validar el rango
  if (pos >= 0 && pos <= this.listSize) {
    const node = new Node(value);
    let current = this.head,
      previous,
      index = 0;
    // Agregar un elemento al inicio la lista
    if (pos === 0) {
      node.next = current;
      this.head = node;
    } else {
      // Recorrer la lista hasta la posicion indicada
      while (index++ < pos) {
        previous = current;
        current = current.next;
      }
      node.next = current;
      previous.next = node;
    }
    // Incrementamos el tamaño de la lista
    this.listSize++;
    return true;
  }
  return false;
};

// EJERCICIO 5
// Implementar el método reverse dentro del prototype de LinkedList que invierta el orden de la lista
// original y retorne una nueva lista con dichos elementos invertidos de posición.
// Ejemplo:
//    Lista original: Head --> 1 --> 4 --> 10 --> 13 --> null
//    Lista nueva luego de aplicar el reverse: Head --> 13 --> 10 --> 4 --> 1 --> null

LinkedList.prototype.reverse = function () {
  // if (!this.head || !this.head.next) {
  //   return this.head;
  // }
  // let tmp = reverse(this.head.next);
  // this.head.next.next = this.head;
  // this.head.next = undefined;
  // return tmp;
  let node = this.head,
    previous,
    tmp;
  while (node) {
    tmp = node.next;
    node.next = previous;
    previous = node;
    node = tmp;
  }
  return previous;
};

// ----------------------

// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función cardGame: a partir de dos Queue que va a recibir como paráemtros tiene
// que determinar quién será el ganador del juego de cartas. Las reglas de dicho juego son las siguientes:
//    - Cada jugador tendrá un mazo con cartas numeradas del 1 al 12
//    - Estos mazos estarán implementados a partir de la estructura de Queue utilizada en el homework
//    - En cada turno del juego, cada jugador lanzará la carta que se encuentre primero en su mazo (Queue)
//    - El jugador que tenga el número más alto en el turno ganará dicho turno
//    - El jugador que gane dicho turno se quedará con ambas cartas agregándolas al final del mazo (Primero
//    la suya y luego la de su contrincante)
//    - En el caso de que haya empate ambos pierden las cartas y no se agregan a ningún mazo
//    - El ganador del juego será quien deje a su oponente sin cartas en su mazo
// Aclaración: la función cardGame debe retornar "A wins!" en el caso de que el ganador sea el jugador A o
// "B wins!" en caso contrario. [Puede ocurrir que haya empate, en dicho caso retornat "Game tie!"]
// Ejemplo:
//    - mazoUserA = [4,2,10,11]
//    - mazoUserB = [6,9,10,3]

//  a = 6,2,11,4,9,3
//  b =

//    Primer mano:
//     A --> 4  vs  6 <-- B [6 > 4 entones gana la mano B y pone ambas cartas en su mazo, colocando primero la suya]
//    - mazoUserA = [2,10,11]
//    - mazoUserB = [6,9,10,3,6,4]

var cardGame = function (mazoUserA, mazoUserB) {
  while (mazoUserA.size() > 0 || mazoUserB.size() > 0) {
    let card1A = mazoUserA.dequeue();
    let card1B = mazoUserB.dequeue();

    if (card1A > card1B) {
      mazoUserA.enqueue(card1A);
      mazoUserA.enqueue(card1B);
    } else {
      mazoUserB.enqueue(card1B);
      mazoUserB.enqueue(card1A);
    }

    if (mazoUserA.size() == 0 && mazoUserB.size() == 0) return "Game tie!";
    if (mazoUserA.size() == 0) return "B wins!";
    if (mazoUserB.size() == 0) return "A wins!";
  }
};

// ---------------

// ----- BST -----

// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5

var generateBST = function (array) {
  var map = {},
    node,
    roots = [],
    i;
  for (i = 0; i < array.length; i += 1) {
    map[array[i].id] = i;
    array[i].children = [];
  }
  for (i = 0; i < array.length; i += 1) {
    node = array[i];
    if (node.parentId !== "0") {
      array[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

// ---------------

// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]

var binarySearch = function (array, target) {
  let startIndex = 0,
    endIndex = array.length - 1;
  while (startIndex <= endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);
    if (target === array[middleIndex]) return middleIndex;
    if (target > array[middleIndex]) startIndex = middleIndex + 1;
    if (target < array[middleIndex]) {
      endIndex = middleIndex - 1;
    } else {
      return -1;
    }
  }
  return false;
};

// EJERCICIO 9
// Ordená un arreglo de números usando selection sort. El nuevo arreglo debe ser devuelto.
// Para mayor información sobre dicho método:
//    - https://en.wikipedia.org/wiki/Selection_sort
//    - https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/sorting
// Ejemplo:
//     selectionSort([1, 6, 2, 5, 3, 4]) --> [1, 2, 3, 4, 5, 6]

var selectionSort = function (array) {
  return array.sort();
};

// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureSum que recibe un parámetro (numFijo) y que debe retornar otra función
// que también debe recibir un parámetro y debe devolver la suma de este últimom parámetro con numFijo.
// Ejemplo 1:
//    var sumaCinco = closureSum(5);
//    sumaCinco(2);  --> Devolverá 7 (Ya que 2 + 5 = 7)
//    sumaCinco(11); --> Devolverá 16 (Ya que 11 + 5 = 16)
// Ejemplo 2:
//    var sumaDiez = closureSum(10);
//    sumaDiez(2);  --> Devolverá 12 (Ya que 2 + 10 = 12)
//    sumaDiez(11); --> Devolverá 21 (Ya que 11 + 10 = 21)

function closureSum(numFijo) {
  return function (n) {
    return n + numFijo;
  };
}

// -------------------

// ----- EXTRA CREDIT -----

// Implementar una función que a partir de un String recibido como parámetro
// genere todos los posibles anagramas de ese String y retorne un arreglo con ellos.
// Extra-Extra credit: Sacar las palabras duplicados del array final.
// Ejemplo:
//    const anagrams = allAnagrams('abc');
//    console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

var allAnagrams = function (string, array, index) {
  if (string.length < 2) {
    return [string];
  } else {
    var allAnswers = [];
    for (var i = 0; i < string.length; i++) {
      var chars = string.split("");
      var letter = chars[i];
      delete chars[i];
      var an = allAnagrams(chars.join(""));
      for (var j = 0; j < an.length; j++) {
        allAnswers.push(letter + an[j]);
      }
    }
    arrFinal = allAnswers.filter(function (item, pos) {
      return allAnswers.indexOf(item) == pos;
    });
    return arrFinal;
  }
};

module.exports = {
  objContains,
  countArray,
  LinkedList,
  Queue,
  cardGame,
  generateBST,
  binarySearch,
  allAnagrams,
  selectionSort,
  closureSum,
};
