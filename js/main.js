

class Alumno{
	constructor(nombre,apellido,dni){
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
	}
}
(async () => {
const URL = "../Alexia/json/profesores.json";

document.getElementById('formLogin').addEventListener("submit", comprobarLogin);

let userList = [];
let nombreUsuario;

function guardarUsers( users ) {
	userList = users;
}

function comprobarLogin(e){
	e.preventDefault();
	comprobarProfesor();
}

function comprobarProfesor() {
	let i = 0;
	nombreUsuario = document.getElementById("user").value.toUpperCase();
	userList.forEach( prof => {
		if (prof.user == nombreUsuario) {
			Swal.fire({
		  text: "Ingresando...",
		  icon: "success",
		  buttons: false,
		  timer: 1000,
		});
			loginProfesor();
		}
		else{
			i = i + 1;
		}
		if(i == userList.length){
			Swal.fire({
		  text: "Usuario Incorrecto",
		  icon: "error",
		  buttons: false,
		  timer: 1000,
		});
		}
	});
}

function loginProfesor(){
	let usuarioProfesor = document.getElementById("UserTitulo");
	usuarioProfesor.innerHTML = `Hola, ${nombreUsuario}`;
	let loginProfesor = document.getElementById("contenedor");
	loginProfesor.innerHTML = "";
	loginProfesor.innerHTML =` 
		<div class = "col1">
			<div id ="seccionBoton"></div>
		</div>
		<div class = "col2"></div> 
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
}
}	

function agregarAlumno(){
	const { value: nombreAlumno } = await Swal.fire({
  title: 'Ingresa nombre del Alumno',
  input: 'text',
  inputPlaceholder: 'Nombre',
  showCancelButton: true,
  inputValidator: (value) => {
    if (!value) {
      return 'Por favor Escriba el Nombre'
    }
  }
}).then(
{
	if (nombreAlumno) 
	{
  		Swal.fire(`Nombre del Alumno : ${nombreAlumno}`);
	}	
})
}	
fetch( URL )
	.then( res => res.json() )
	.then( data => { guardarUsers( data ) } )
	.catch( err => { console.log("Hubo un error: ");})

})()