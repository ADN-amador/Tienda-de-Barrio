$(function () {
    $('#getProducts').on('click', function () {
        $.ajax({
            url: 'http://localhost:8080/Tutorial/api/clientes',
            success: function (products) {
                let tbody = $('tbody')
                tbody.html('');
                products.forEach(product => {
                    tbody.append(`
                        <tr>
                        <td width="5" class='id'>${product.id_cliente}</td>
                        <td width="15">
                        <input type="text" class='nombre' value="${product.nombre}"</td>
                     
                        <td width="15">
                        <input type="text" class='direccion' value="${product.direccion}"</td>
                   
                        <td width="15">
                        <input type="text" class='telefono' value="${product.telefono}"</td>
                    
                        <td width="15">
                        <input type="text" class='ciudad' value="${product.ciudad}"</td>
                        <td width="35">
                        <button class="update-button"> Update </button>
                        <button class="delete-button"> Delete </button>
                        </td>
                        </tr>
                        `)
                })
            }
        })
    })
    $('#productForm').on('submit', function (e) {
        e.preventDefault()
        let newProduct = $('#newProduct')
        $.ajax({
            url: 'http://localhost:8080/Tutorial/api/clientes',
            method: 'post',
            data: {
                name: newProduct.val()
            },
            success: function (response) {
                $('#getProducts').click()
            }
        })
    })
    $('table').on('click', '.update-button', function () {
        let row = $(this).closest('tr')
        let id = row.find('.id').text()
        let name = row.find('.name').val()

        $.ajax({
            url: 'http://localhost:8080/Tutorial/api/clientes/' + id,
            method: 'PUT',
            data: {
                "ciudad": "Bucaramanga",
                "direccion": "Kra11#9-56",
                "id_cliente": 8765,
                "nombre": "Javier Díaz",
                "telefono": "7702291"
            },
            success: function (response) {
                console.log(response)
            }
        })
    })
    $('table').on('click', '.delete-button', function () {
        let row = $(this).closest('tr') // obtengo toda la fila que seleccione
        let id = row.find('.id').text();
        $.ajax({
            url: 'http://localhost:8080/Tutorial/api/clientes/' + id,
            method: 'delete',
            success: function (response) {
                console.log(response)
                $('#getProducts').click();
            }
        })
    })
})