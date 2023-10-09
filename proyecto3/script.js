// Crear un objeto constructor para los cines
function Cine(nombre, filas, columnas, pelicula, precio, asientos) {
    this.nombre = nombre; // El nombre del cine
    this.filas = filas; // El número de filas de asientos
    this.columnas = columnas; // El número de columnas de asientos
    this.pelicula = pelicula; // El nombre de la película que se proyecta
    this.precio = precio; // El precio de la entrada
    this.asientos = asientos; // Un array bidimensional que representa los asientos del cine, con 0 si están libres y 1 si están ocupados
  }
  
  // Crear un método para reservar un asiento en el cine
  Cine.prototype.reservarAsiento = function(fila, columna) {
    // Comprobar si el asiento está libre
    if (this.asientos[fila][columna] == 0) {
      // Cambiar el estado del asiento a ocupado
      this.asientos[fila][columna] = 1;
      // Devolver true para indicar que la reserva se ha realizado con éxito
      return true;
    } else {
      // Devolver false para indicar que el asiento ya está ocupado
      return false;
    }
  }
  
  // Crear un método para liberar un asiento en el cine
  Cine.prototype.liberarAsiento = function(fila, columna) {
    // Comprobar si el asiento está ocupado
    if (this.asientos[fila][columna] == 1) {
      // Cambiar el estado del asiento a libre
      this.asientos[fila][columna] = 0;
      // Devolver true para indicar que la liberación se ha realizado con éxito
      return true;
    } else {
      // Devolver false para indicar que el asiento ya está libre
      return false;
    }
  }
  
  // Crear una función para generar un array bidimensional con valores aleatorios entre 0 y 1
  function generarAsientos(filas, columnas) {
    // Crear un array vacío
    var asientos = [];
    // Recorrer las filas
    for (var i = 0; i < filas; i++) {
      // Crear un array vacío para la fila actual
      var fila = [];
      // Recorrer las columnas
      for (var j = 0; j < columnas; j++) {
        // Generar un valor aleatorio entre 0 y 1
        var valor = Math.floor(Math.random() * 2);
        // Añadir el valor al array de la fila
        fila.push(valor);
      }
      // Añadir el array de la fila al array de los asientos
      asientos.push(fila);
    }
    // Devolver el array de los asientos
    return asientos;
  }
  
  // Crear una función para mostrar una tabla HTML con los asientos del cine y sus precios y disponibilidades
  function mostrarAsientos(cine) {
    // Obtener el elemento donde se va a mostrar la tabla
    var contenedor = document.getElementById("contenedor");
    // Vaciar el contenido del elemento
    contenedor.innerHTML = "";
    // Crear un elemento tabla
    var tabla = document.createElement("table");
    // Añadir un atributo id a la tabla con el nombre del cine
    tabla.setAttribute("id", cine.nombre);
    
  // Recorrer las filas de los asientos del cine
  for (var i = 0; i < cine.filas; i++) {
  // Crear un elemento fila
  var tr = document.createElement("tr");
  // Recorrer las columnas de los asientos del cine
  for (var j = 0; j < cine.columnas; j++) {
  // Crear un elemento celda
  var td = document.createElement("td");
  // Añadir un atributo id a la celda con la fila y la columna del asiento
  td.setAttribute("id", i + "-" + j);
  // Añadir un atributo class a la celda con el estado del asiento (libre u ocupado)
  td.setAttribute("class", cine.asientos[i][j] == 0 ? "libre" : "ocupado");
  // Añadir un evento click a la celda para seleccionar o deseleccionar el asiento al hacer clic en él
  td.addEventListener("click", function() {
  seleccionarAsiento(cine, this);
  });
  // Añadir el precio del asiento al contenido de la celda
  td.innerHTML = cine.precio + "€";
  // Añadir la celda a la fila
  tr.appendChild(td);
  }
  // Añadir la fila a la tabla
  tabla.appendChild(tr);
  }
  // Añadir la tabla al elemento contenedor
  contenedor.appendChild(tabla);
  }
  
  // Crear una función para seleccionar o deseleccionar un asiento al hacer clic en él
  function seleccionarAsiento(cine, celda) {
  // Obtener el id de la celda, que contiene la fila y la columna del asiento
  var id = celda.getAttribute("id");
  // Separar el id por el guion y obtener la fila y la columna como números enteros
  var fila = parseInt(id.split("-")[0]);
  var columna = parseInt(id.split("-")[1]);
  // Comprobar si el asiento está libre
  if (cine.asientos[fila][columna] == 0) {
  // Reservar el asiento en el cine
  cine.reservarAsiento(fila, columna);
  // Cambiar el atributo class de la celda a seleccionado
  celda.setAttribute("class", "seleccionado");
  // Actualizar el precio total de la compra
  actualizarPrecio(cine);
  } else if (cine.asientos[fila][columna] == 1) {
  // Mostrar un mensaje de alerta indicando que el asiento está ocupado
  alert("Este asiento está ocupado");
  } else {
  // Liberar el asiento en el cine
  cine.liberarAsiento(fila, columna);
  // Cambiar el atributo class de la celda a libre
  celda.setAttribute("class", "libre");
  // Actualizar el precio total de la compra
  actualizarPrecio(cine);
  }
  }
  
  // Crear una función para actualizar el precio total de la compra según los asientos seleccionados
  function actualizarPrecio(cine) {
  // Obtener el elemento donde se va a mostrar el precio total
  var total = document.getElementById("total");
  // Inicializar una variable para almacenar el precio total
  var precioTotal = 0;
  // Recorrer las filas de los asientos del cine
  for (var i = 0; i < cine.filas; i++) {
  // Recorrer las columnas de los asientos del cine
  for (var j = 0; j < cine.columnas; j++) {
  // Comprobar si el asiento está seleccionado
  if (cine.asientos[i][j] == 2) {
  // Sumar el precio del asiento al precio total
  precioTotal += cine.precio;
  }
  }
  }
  // Mostrar el precio total en el elemento correspondiente
  total.innerHTML = "Precio total: " + precioTotal + "€";
  }
  
  // Crear una función para guardar los asientos reservados en el sessionStorage
  function guardarAsientos(cine) {
  // Convertir el array de los asientos del cine a una cadena JSON
  var asientosJSON = JSON.stringify(cine.asientos);
  // Guardar la cadena JSON en el sessionStorage con la clave del nombre del cine
  sessionStorage.setItem(cine.nombre, asientosJSON);
  }
  
  // Crear una función para cargar los asientos reservados desde el sessionStorage
  function cargarAsientos(cine) {
  // Obtener la cadena JSON del sessionStorage con la clave del nombre del cine
  var asientosJSON = sessionStorage.getItem(cine.nombre);
  // Comprobar si hay algún dato guardado
  if (asientosJSON) {
  // Convertir la cadena JSON a un array de los asientos del cine
  var asientos = JSON.parse(asientosJSON);
  // Asignar el array de los asientos al cine correspondiente
  cine.asientos = asientos;
  }
  }
  
  // Crear tres objetos Cine con datos aleatorios usando el constructor Cine y la función generarAsientos
  var cine1 = new Cine("Cine1", 10, 10, "Pelicula1", 5, generarAsientos(10,10));
  var cine2 = new Cine("Cine2", 8, 12, "Pelicula2", 6, generarAsientos(8,12));
  var cine3 = new Cine("Cine3", 12,8, "Pelicula3",7, generarAsientos(12,8));
  
  