document.addEventListener("DOMContentLoaded", () => {
    const urlConsumida = "https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees"
    
    let body = document.querySelector("body");
    let table = document.querySelector("tbody");
    let buttonAdd = document.querySelector(".botonAñadir"); 
    
    fetch(urlConsumida)
    .then((resupesta)=> resupesta.json())
    .then((dataEmpleados) => {
        crearFilaEmpleado(dataEmpleados);  
    })
    .catch((error) => {
    
    })
    
    function crearFilaEmpleado(listaEmpleados) {
         listaEmpleados.forEach(datosEmpleado => creandoFila(datosEmpleado))
        //{
        //     let filaEmpleado = document.createElement("tr");
        //     let id = document.createElement("th");
        //     id.innerText = datosEmpleado.id;
        //     let name = document.createElement("td");
        //     name.innerText = datosEmpleado.name;
        //     name.classList.add("editable");
        //     let city = document.createElement("td");
        //     city.innerText = datosEmpleado.city;
        //     city.classList.add("editable");
        //     let birthday = document.createElement("td");
        //     birthday.innerText = recortarBirthday(datosEmpleado.birthday);  
        //     birthday.classList.add("editable"); 
        //     let email = document.createElement("td");
        //     email.innerText = datosEmpleado.email;
        //     email.classList.add("editable");
        //     let buttonEdit = document.createElement("button");
        //     buttonEdit.innerText = "Editar";
        //     buttonEdit.classList.add("boton");
        //     let buttonDelete = document.createElement("button");
        //     buttonDelete.innerText = "Eliminar";
        //     buttonDelete.classList.add("boton");
            
        //     //procedo a juntar los componentes.
        //     table.appendChild(filaEmpleado);
        //     filaEmpleado.appendChild(id);
        //     filaEmpleado.appendChild(name);
        //     filaEmpleado.appendChild(city);
        //     filaEmpleado.appendChild(birthday);
        //     filaEmpleado.appendChild(email);
        //     filaEmpleado.appendChild(buttonEdit);
        //     filaEmpleado.appendChild(buttonDelete);
        //     table.classList.add("estiloTabla");
        //     //añadiendo funcionalidad editar
        //     buttonEdit.addEventListener("click", () => {
        //         let editables = buttonEdit.parentElement;
        //         editables = editables.childNodes
        //         if(buttonEdit.innerText == "Editar") {
        //             editar(editables);
        //             buttonEdit.innerText = "Aceptar";
        //         } else {
        //             terminarCambio(editables)
        //             buttonEdit.innerText = "Editar";
        //         }
        //     });
        //     //añadiendo funcionalidad eliminar
        //     buttonDelete.addEventListener("click", () => {
        //         filaEmpleado.remove();
        //     })
        // })
    }
    //HAY Q REUTILIZAR EL BOTON...

    function editar(nodos) {
        nodos.forEach(elemento => {
            if(elemento.className === "editable") {
                let celdasEditables = document.createElement("input");
                celdasEditables.value = elemento.innerText;
                elemento.replaceWith(celdasEditables);
                celdasEditables.classList.add("editable")  
            }
        })     
    }

    function terminarCambio(nodos) {
        
        nodos.forEach(elemento => {
            if(elemento.className === "editable") {
                let celdaFinal = document.createElement("td");
                celdaFinal.innerText = elemento.value;
                elemento.replaceWith(celdaFinal);  
                celdaFinal.classList.add("editable")                   
                };
            }); 
    };
            
    //el dato birthday viene con hora y detalles q no importan, se los sacamos.
    function recortarBirthday(pBirthday) {
            let fechaSalida = ""
            for (let index = 0; index < pBirthday.length; index++) {
                if(pBirthday[index] == "T") {   
                    break;
                } else {
                    fechaSalida+= pBirthday[index];
                }
            }
            return fechaSalida;
    }    

    //funcion crear fila Empleado

    function creandoFila(datosEmpleado) {
        let filaEmpleado = document.createElement("tr");
        let id = document.createElement("th");
        id.innerText = datosEmpleado.id;
        let name = document.createElement("td");
        name.innerText = datosEmpleado.name;
        name.classList.add("editable");
        let city = document.createElement("td");
        city.innerText = datosEmpleado.city;
        city.classList.add("editable");
        let birthday = document.createElement("td");
        birthday.innerText = recortarBirthday(datosEmpleado.birthday);  
        birthday.classList.add("editable"); 
        let email = document.createElement("td");
        email.innerText = datosEmpleado.email;
        email.classList.add("editable");
        let buttonEdit = document.createElement("button");
        buttonEdit.innerText = "Editar";
        buttonEdit.classList.add("boton");
        let buttonDelete = document.createElement("button");
        buttonDelete.innerText = "Eliminar";
        buttonDelete.classList.add("boton");
        
        //procedo a juntar los componentes.
        table.appendChild(filaEmpleado);
        filaEmpleado.appendChild(id);
        filaEmpleado.appendChild(name);
        filaEmpleado.appendChild(city);
        filaEmpleado.appendChild(birthday);
        filaEmpleado.appendChild(email);
        filaEmpleado.appendChild(buttonEdit);
        filaEmpleado.appendChild(buttonDelete);
        table.classList.add("estiloTabla");
        //añadiendo funcionalidad editar
        buttonEdit.addEventListener("click", () => {
            let editables = buttonEdit.parentElement;
            editables = editables.childNodes
            if(buttonEdit.innerText == "Editar") {
                editar(editables);
                buttonEdit.innerText = "Aceptar";
            } else {
                terminarCambio(editables)
                buttonEdit.innerText = "Editar";
            }
        });
        //añadiendo funcionalidad eliminar
        buttonDelete.addEventListener("click", () => {
            filaEmpleado.remove();
        })
    }

    //boton Añadir
    buttonAdd.addEventListener("click", () => {
        let nombre = document.querySelector("#nombre").value;
        let ciudad = document.querySelector("#ciudad").value;
        let datobirthday = document.querySelector("#birthday").value;
        let datoEmail = document.querySelector("#email").value;

        if(checkValores(nombre, ciudad, datobirthday, datoEmail) === true) {
            let totalID = document.querySelectorAll("tbody th").length
            let ultimoID = document.querySelectorAll("tbody th").item(totalID-1).innerText;
            let empleado = {
                id : Number(ultimoID) + 1,
                name : nombre,
                city: ciudad,
                birthday: datobirthday,
                email: datoEmail
            }
            creandoFila(empleado);
        }
        
        alert("empleado añadido con exito");
        limpiarForm();

    })

    function limpiarForm() {
        document.querySelector("#nombre").value = "";
        document.querySelector("#ciudad").value = "";
        document.querySelector("#birthday").value = "";
        document.querySelector("#email").value = "";
    }

    function checkValores(pNombre, pCiudad, pBirthday, pEmail) {
        if(nombre == "") {
            alert("no escribio el nombre");
            return false;
        }

        if(ciudad == "") {
            alert("no escribio la ciudad");
            return false;
        }

        if(birthday == "") {
            alert("no escribio la ciudad");
            return false;
        }

        if(email == "") {
            alert("no escribio la ciudad");
            return false;
        }

        return true
    }

});

