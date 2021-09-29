const url = "https://minticloud.uis.edu.co/c3s56formador/api/clientes"
//const url = "http://localhost:8080/Tutorial/api/clientes";
const contenedor = document.querySelector('tbody')
let resultados = ''


const modalClientes = new bootstrap.Modal(document.getElementById('modalCliente'))
const formClientes = document.querySelector('form')
const nombreCliente = document.getElementById('nombre')
const direccionCliente = document.getElementById('direccion')
const telefonoCliente = document.getElementById('telefono')
const ciudadCliente = document.getElementById('ciudad')
const idCliente = document.getElementById('id')

let opcion = ''

btnCrear.addEventListener('click', () => {
    nombreCliente.value = ''
    direccionCliente.value = ''
    telefonoCliente.value = ''
    ciudadCliente.value = ''
    idCliente.value = ''
    idCliente.disabled = false
    modalClientes.show()
    opcion = 'crear'
})


const ajax = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json);
        } else {
            let message = xhr.statusText || "Ocurrió un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });

    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
};



const getAll = () => {
    ajax({
        url: url,
        method: "GET",
        success: (res) => {
            console.log(res);

            res.forEach((clientes) => {
                resultados += `<tr>
                        <td width="10%">${clientes.id_cliente}</td>
                        <td width="15%">${clientes.nombre}</td>
                        <td width="25%">${clientes.direccion}</td>
                        <td width="15%">${clientes.telefono}</td>
                        <td width="15%">${clientes.ciudad}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
            });

            contenedor.innerHTML = resultados
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
    });
};
document.addEventListener("DOMContentLoaded", getAll);
document.addEventListener("click", (e) => {

    if (e.target.matches(".btnBorrar")) {
        const fila = e.target.parentNode.parentNode
        const id = fila.firstElementChild.innerHTML
        console.log(id)
        alertify.confirm(`¿Estás seguro de eliminar el id ${id}?`,
            function () {
                ajax({
                    url: url + "/" + id,
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: (res) => location.reload(),
                    error: (err) => alert(err),
                });
                alertify.success('Registro eliminado')
            },
            function () {
                alertify.error('Cancel')
            });



    }
    if (e.target.matches(".btnEditar")) {
        const fila = e.target.parentNode.parentNode
        idCliente.value = fila.children[0].innerHTML
        nombreCliente.value = fila.children[1].innerHTML
        direccionCliente.value = fila.children[2].innerHTML
        telefonoCliente.value = fila.children[3].innerHTML
        ciudadCliente.value = fila.children[4].innerHTML
        idCliente.disabled = true
        opcion = 'editar'
        modalClientes.show()
    }
})

formClientes.addEventListener('submit', (e) => {
    e.preventDefault()
    let metodo = "POST"
    if (opcion == 'editar') {
        metodo = "PUT"

    }
    ajax({
        url: url,
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (res) => location.reload(),
        error: (err) =>
            $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
            "ciudad": ciudadCliente.value,
            "direccion": direccionCliente.value,
            "id_cliente": idCliente.value,
            "nombre": nombreCliente.value,
            "telefono": telefonoCliente.value
        },
    });
    modalClientes.hide()
})
