function listar() {
    $.ajax({
        method: "GET",
        url: "/razas/api/razas",
        success: function (razas) {

            let tabla = new DataTable('#example1');

            razas.forEach(raza => {

                let botones =
                    '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-update" onclick="identificaActualizar(' + raza.id + ')">Editar</button>';

                botones +=
                    ' <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal-delete" onclick="identificaEliminar(' + raza.id + ')">Eliminar</button>';

                tabla.row
                    .add([
                        raza.id,
                        raza.nombre,
                        raza.descripcion,
                        botones
                    ])
                    .draw()
                    .node().id = 'renglon_' + raza.id;

            });

        }
    });
}

function guardar() {

    let nombreRaza = document.getElementById('nombre').value;
    let descripcionRaza = document.getElementById('descripcion').value;

    $.ajax({
        method: 'POST',
        url: '/razas/api/razas',
        contentType: 'application/json',
        data: JSON.stringify({
            nombre: nombreRaza,
            descripcion: descripcionRaza
        }),
        success: function (raza) {

            let tabla = new DataTable('#example1');

            tabla.row
                .add([
                    raza.id,
                    raza.nombre,
                    raza.descripcion,
                    '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-update" onclick="identificaActualizar(' + raza.id + ')">Editar</button>' +
                    ' <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal-delete" onclick="identificaEliminar(' + raza.id + ')">Eliminar</button>'
                ])
                .draw()
                .node().id = 'renglon_' + raza.id;

            alert("Raza guardada correctamente");

            limpiarFormulario();

        }
    });
}

function limpiarFormulario() {

    document.getElementById('nombre').value = "";
    document.getElementById('descripcion').value = "";

    document.getElementById('nombre').focus();

}

function identificaActualizar(id) {

    $.ajax({
        method: 'GET',
        url: '/razas/api/razas/' + id,
        success: function (raza) {

            document.getElementById('id-update').value = raza.id;
            document.getElementById('nombre-update').value = raza.nombre;
            document.getElementById('descripcion-update').value = raza.descripcion;

        }
    });
}

function actualizar() {

    let idRaza = document.getElementById('id-update').value;
    let nombreRaza = document.getElementById('nombre-update').value;
    let descripcionRaza = document.getElementById('descripcion-update').value;

    $.ajax({
        method: 'PATCH',
        url: '/razas/api/razas/' + idRaza,
        contentType: 'application/json',
        data: JSON.stringify({
            nombre: nombreRaza,
            descripcion: descripcionRaza
        }),
        success: function () {

            let tabla = new DataTable('#example1');

            let datos = tabla.row('#renglon_' + idRaza).data();

            datos[1] = nombreRaza;
            datos[2] = descripcionRaza;

            tabla.row('#renglon_' + idRaza).data(datos);

            tabla.draw();

            alert("Raza actualizada correctamente");

        }
    });
}

function identificaEliminar(id) {

    $.ajax({
        method: 'GET',
        url: '/razas/api/razas/' + id,
        success: function (raza) {

            document.getElementById('id-eliminar').value = raza.id;
            document.getElementById('nombre-delete').value = raza.nombre;
            document.getElementById('descripcion-delete').value = raza.descripcion;

        }
    });
}

function eliminar() {

    let idEliminar = document.getElementById('id-eliminar').value;

    $.ajax({
        method: 'DELETE',
        url: '/razas/api/razas/' + idEliminar,
        success: function () {

            let tabla = new DataTable('#example1');

            tabla.row('#renglon_' + idEliminar)
                .remove()
                .draw();

            alert("Raza eliminada correctamente");

        }
    });
}