
// Función para agregar un producto
function agregarProducto() {
    let nombre = document.querySelector(".nombre-producto").value;
    let precio = document.querySelector(".precio-producto").value;
    let presentacion = document.querySelector(".presentacion-producto").value;
    let imagen = document.querySelector(".imagen-producto").value;

    if (nombre && precio && presentacion && imagen) {
        let producto = {
            nombre: nombre,
            precio: precio,
            presentacion: presentacion,
            imagen: imagen
        };
        let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
        productosGuardados.push(producto);
        localStorage.setItem("productos", JSON.stringify(productosGuardados));
        mostrarProductos();
        limpiarFormulario();
    } else {
        alert("Todos los campos son obligatorios.");
    }
}


// Función para mostrar los productos en la tabla
function mostrarProductos() {

    let textoBusqueda = document.querySelector(".input-buscar").value.trim().toLowerCase();

    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    let productosFiltrados = productosGuardados.filter(producto => {
        return producto.nombre.toLowerCase().includes(textoBusqueda);
    });
    console.log(productosFiltrados);

    let tablaProductos = document.getElementById("tabla-productos");
    tablaProductos.innerHTML = "";
    productosFiltrados.forEach((producto, index) => {
        let fila = `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${producto.nombre}</td>
                        <td>${producto.presentacion}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.imagen}</td>
                        <td><button class="btn btn-warning btn-editar" onclick="editarProducto(${index})">Editar</button></td>
                        <td><button class="btn btn-danger btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button></td>
                    </tr>`;
        tablaProductos.innerHTML += fila;
    });
}

// Función para editar un producto
// Función para editar un producto
function editarProducto(id) {
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    let producto = productosGuardados[id];
    if (producto) {
        // Rellenar los campos del formulario con los datos del producto seleccionado
        document.querySelector(".nombre-producto").value = producto.nombre;
        document.querySelector(".precio-producto").value = producto.precio;
        document.querySelector(".presentacion-producto").value = producto.presentacion;
        document.querySelector(".imagen-producto").value = producto.imagen;

        // Al hacer clic en el botón Guardar después de editar
        document.querySelector(".btn-guardar").onclick = function() {
            // Obtener los nuevos valores del formulario
            let nombre = document.querySelector(".nombre-producto").value;
            let precio = document.querySelector(".precio-producto").value;
            let presentacion = document.querySelector(".presentacion-producto").value;
            let imagen = document.querySelector(".imagen-producto").value;

            // Actualizar el producto en localStorage
            producto.nombre = nombre;
            producto.precio = precio;
            producto.presentacion = presentacion;
            producto.imagen = imagen;

            localStorage.setItem("productos", JSON.stringify(productosGuardados));
            mostrarProductos();
            limpiarFormulario();

            // Restaurar el evento onclick original del botón Guardar
            document.querySelector(".btn-guardar").onclick = agregarProducto;
        };
    }
}

// Función para eliminar un producto
function eliminarProducto(id) {
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    if (productosGuardados && productosGuardados.length > id) {
        productosGuardados.splice(id, 1);
        localStorage.setItem("productos", JSON.stringify(productosGuardados));
        mostrarProductos();
        alert("Producto eliminado con éxito");
    } else {
        alert("ID de producto no válido");
    }
}

// Función para limpiar el formulario después de guardar o editar un producto
function limpiarFormulario() {
    document.querySelector(".nombre-producto").value = "";
    document.querySelector(".precio-producto").value = "";
    document.querySelector(".presentacion-producto").value = "";
    document.querySelector(".imagen-producto").value = "";
}

// Mostrar productos al cargar la página
mostrarProductos();