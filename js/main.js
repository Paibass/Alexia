class Alumno {
    constructor(nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}
const URL = "../Alexia/json/profesores.json";

document.getElementById('formLogin').addEventListener("submit", comprobarLogin);

let userList = [];
let nombreUsuario;


function guardarUsers(users) {
    userList = users;
    userList.forEach(prof => {
        console.log(prof.user);
    })
}

function comprobarLogin(e) {
    e.preventDefault();
    comprobarProfesor();
}

function comprobarProfesor() {
    let i = 0;
    nombreUsuario = document.getElementById("user").value.toUpperCase();
    userList.forEach(prof => {
        if (prof.user == nombreUsuario) {
            Swal.fire({
                text: "Ingresando...",
                icon: "success",
                buttons: false,
                timer: 1000,
            });
            loginProfesor();
        } else {
            i = i + 1;
        }
        if (i == userList.length) {
            Swal.fire({
                text: "Usuario Incorrecto",
                icon: "error",
                buttons: false,
                timer: 1000,
            });
            Toastify({
                text: "Pss! Abre la consola para ver los usuarios",
                duration: 2000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #7d47ba, #4e0b9a)'
                }
            }).showToast();
        }
    });
}

function agregarClass() {
    let loginProfesor = document.getElementsByClassName("contenedor");

    for (i = 0; i < loginProfesor.length; i++) {
        loginProfesor[i].classList.replace('contenedor', 'contenedor1');
    }

}

function loginProfesor() {
    let usuarioProfesor = document.getElementById("UserTitulo");
    usuarioProfesor.innerHTML = `Hola, ${nombreUsuario}`;
    let loginProfesor = document.getElementById("contenedor");
    agregarClass();
    loginProfesor.innerHTML = "";
    loginProfesor.innerHTML = ` 
		<div class = "col1">
			<div class ="seccionBoton" id ="seccionBoton"></div>
			<div class="colAlumnos" id="colAlumnos"></div>
		</div> 
	 `;
    let seccionBtn = document.getElementById("seccionBoton");
    const btnAgregarAlumno = document.createElement("button");
    btnAgregarAlumno.innerText = "Agregar Alumno";
    btnAgregarAlumno.addEventListener("click", agregarAlumno);
    seccionBtn.appendChild(btnAgregarAlumno);

    const alumnos = JSON.parse(localStorage.getItem(nombreUsuario));

    if (alumnos == null) {
        Toastify({
            text: "ERROR! No tienes Alumnos Cargados",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #e66465, #b30f0f)'
            }
        }).showToast();
    } else if (alumnos.length == 0) {
        Toastify({
            text: "ERROR! No tienes Alumnos Cargados",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
                background: 'linear-gradient(to right, #e66465, #b30f0f)'
            }
        }).showToast();
    } else {
        mostrarAlumnos(alumnos);
    }
}

function agregarAlumno(alumnos) {
    Swal.fire({
        title: 'Ficha Alumno',
        html: '<form><input placeholder="Nombre" id="inputNombre" type="text"><input placeholder="Apellido" id="inputApellido" type="text"><input placeholder="DNI" id="inputDNI" type="text"></form>',
        confirmButtonText: 'Agregar'
    }).then(() => {
        const nombre = document.getElementById("inputNombre").value;
        const apellido = document.getElementById("inputApellido").value;
        const dni = document.getElementById("inputDNI").value;

        const alumno = new Alumno(nombre, apellido, dni);

        pushAlumno(alumno);
    })
}

function pushAlumno(alumno) {
    const alumnosEnLS = JSON.parse(localStorage.getItem(nombreUsuario));

    if (alumnosEnLS == null) {
        localStorage.setItem(nombreUsuario, JSON.stringify([alumno]));
        mostrarAlumnos([alumno]);
    } else {
        alumnosEnLS.push(alumno);
        localStorage.setItem(nombreUsuario, JSON.stringify(alumnosEnLS));
        mostrarAlumnos(alumnosEnLS);
    }
}

function mostrarAlumnos(alumnos) {
    let listadoAlumnos = document.getElementById("colAlumnos");
    listadoAlumnos.innerHTML = "";
    let ul = document.createElement("ul");
    listadoAlumnos.appendChild(ul);

    alumnos.forEach(alumno => {
        let li = document.createElement("li")
        li.innerHTML = `${alumno.nombre} ${alumno.apellido} - ${alumno.dni}`
        const botonBorrar = document.createElement("button");
        botonBorrar.innerText = "Borrar";
        botonBorrar.addEventListener("click", () => {
            Swal.fire({
                title: 'Estas Seguro?',
                text: "Tendras que agregarlo devuelta si lo borras!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borralo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    borrarAlumno(alumno);
                    Swal.fire(
                        'Borrado!',
                        'El alumno ha sido borrado.',
                        'success'
                    )
                }
            })
        })
        li.appendChild(botonBorrar);
        ul.appendChild(li);
    })
}

function borrarAlumno(alumno) {
    const alumnosEnLS = JSON.parse(localStorage.getItem(nombreUsuario));
    const borrado = alumnosEnLS.filter(pupilo => pupilo.nombre != alumno.nombre);
    localStorage.setItem(nombreUsuario, JSON.stringify(borrado));
    mostrarAlumnos(borrado);
}
fetch(URL)
    .then(res => res.json())
    .then(data => { guardarUsers(data) })
    .catch(err => { console.log("Hubo un error: "); })