function listar() {
    $.ajax({
        method: "GET",
        url: "/mascotas/api/mascotas",
        success: function (mascotas) {

            let tabla = new DataTable('#example1');

            mascotas.forEach(mascota => {

                let botones =
                    '<button type="button" class="btn btn-primary" ' +
                    'data-bs-toggle="modal" data-bs-target="#modal-update" ' +
                    'onclick="identificaActualizar(' + mascota.id + ')">Editar</button>';

                botones +=
                    ' <button type="button" class="btn btn-danger" ' +
                    'data-bs-toggle="modal" data-bs-target="#modal-delete" ' +
                    'onclick="identificaEliminar(' + mascota.id + ')">Eliminar</button>';

                tabla.row.add([
                    mascota.id,
                    mascota.nombre,
                    mascota.raza,
                    mascota.edad + ' años',
                    mascota.observaciones,
                    botones
                ]).draw().node().id = 'renglon_' + mascota.id;

            });
        }
    });
}


function guardar() {

    let nombreMascota = document.getElementById('nombre').value;
    let razaMascota = document.getElementById('raza').value;
    let edadMascota = document.getElementById('edad').value;
    let observacionesMascota =
        document.getElementById('observaciones').value;

    $.ajax({
        method: 'POST',
        url: "/mascotas/api/mascotas",
        contentType: "application/json",

        data: JSON.stringify({
            nombre: nombreMascota,
            raza: razaMascota,
            edad: parseInt(edadMascota),
            observaciones: observacionesMascota
        }),

        success: function (mascota) {

            let tabla = new DataTable("#example1");

            tabla.row.add([
                mascota.id,
                mascota.nombre,
                mascota.raza,
                mascota.edad + ' años',
                mascota.observaciones,

                '<button type="button" class="btn btn-primary" ' +
                'data-bs-toggle="modal" data-bs-target="#modal-update" ' +
                'onclick="identificaActualizar(' + mascota.id + ')">Editar</button>' +

                ' <button type="button" class="btn btn-danger" ' +
                'data-bs-toggle="modal" data-bs-target="#modal-delete" ' +
                'onclick="identificaEliminar(' + mascota.id + ')">Eliminar</button>'

            ]).draw().node().id = 'renglon_' + mascota.id;

            alert("Mascota guardada correctamente");

            limpiarFormulario();
        }
    });
}


function limpiarFormulario() {

    document.getElementById('nombre').value = "";
    document.getElementById('raza').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('observaciones').value = "";

    document.getElementById('nombre').focus();
}


function identificaActualizar(id) {

    $.ajax({
        method: 'GET',
        url: "/mascotas/api/mascotas/" + id,

        success: function (mascota) {

            document.getElementById('id-update').value = mascota.id;
            document.getElementById('nombre-update').value = mascota.nombre;
            document.getElementById('raza-update').value = mascota.raza;
            document.getElementById('edad-update').value = mascota.edad;
            document.getElementById('observaciones-update').value =
                mascota.observaciones;
        }
    });
}


function actualizar() {

    let idMascota =
        document.getElementById('id-update').value;

    let nombreMascota =
        document.getElementById('nombre-update').value;

    let razaMascota =
        document.getElementById('raza-update').value;

    let edadMascota =
        document.getElementById('edad-update').value;

    let observacionesMascota =
        document.getElementById('observaciones-update').value;

    $.ajax({

        method: 'PATCH',
        url: "/mascotas/api/mascotas/" + idMascota,
        contentType: 'application/json',

        data: JSON.stringify({
            nombre: nombreMascota,
            raza: razaMascota,
            edad: parseInt(edadMascota),
            observaciones: observacionesMascota
        }),

        success: function () {

            let tabla = new DataTable("#example1");

            let datos =
                tabla.row("#renglon_" + idMascota).data();

            datos[1] = nombreMascota;
            datos[2] = razaMascota;
            datos[3] = edadMascota + " años";
            datos[4] = observacionesMascota;

            tabla.row("#renglon_" + idMascota).data(datos);
            tabla.draw();

            alert("Mascota actualizada");
        }
    });
}


function identificaEliminar(id) {

    $.ajax({
        method: 'GET',
        url: "/mascotas/api/mascotas/" + id,

        success: function (mascota) {

            document.getElementById('id-eliminar').value =
                mascota.id;

            document.getElementById('nombre-delete').value =
                mascota.nombre;

            document.getElementById('raza-delete').value =
                mascota.raza;

            document.getElementById('edad-delete').value =
                mascota.edad;

            document.getElementById('observaciones-delete').value =
                mascota.observaciones;
        }
    });
}


function eliminar() {

    let idEliminar =
        document.getElementById('id-eliminar').value;

    $.ajax({

        method: 'DELETE',
        url: "/mascotas/api/mascotas/" + idEliminar,

        success: function () {

            alert("Mascota eliminada");

            let tabla = new DataTable('#example1');

            tabla.row('#renglon_' + idEliminar)
                .remove()
                .draw();
        }
    });
}