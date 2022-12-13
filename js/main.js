document.addEventListener("DOMContentLoaded", () => {
    const urlConsumida = "https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees"
    
    let body = document.querySelector("body");
    let table = document.querySelector("tbody");
    
    fetch(urlConsumida)
    .then((resupesta)=> resupesta.json())
    .then((dataEmpleados) => {
        crearFilaEmpleado(dataEmpleados);  
    })
    .catch((error) => {
    
    })
    
    function crearFilaEmpleado(listaEmpleados) {
    listaEmpleados.forEach(datosEmpleado => {
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
    })
    

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
}
});

