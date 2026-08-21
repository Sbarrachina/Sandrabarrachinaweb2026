// Js for Toogle Menu ( Botón Menu-Bar)

var MenuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";

function menutoggle(){
    if(MenuItems.style.maxHeight == "0px")
    {
        MenuItems.style.maxHeight = "200px";

    }
    else
     {
        MenuItems.style.maxHeight = "0px";

    }
}


// datos libros

function cerrarDetalle() {
    document.querySelector("#detalle-libro").style.display = "none";
  }

  
  let libros = [];
let indiceLibroActual = -1;

fetch("/books.json")
  .then(response => response.json())
  .then(data => {
    libros = data.libros;

    // Agregar evento de click a cada imagen del slider
    libros.forEach((libro, indice) => {
      const imagen = document.getElementById(libro.id);
      imagen.addEventListener("click", () => {
        indiceLibroActual = indice;
        mostrarLibroActual();
        document.getElementById("detalle-libro").style.display = "block";
      });
    });

    mostrarLibroActual();
  });

function mostrarLibroActual() {
  const libroActual = libros[indiceLibroActual];
  document.getElementById("titulo").textContent = libroActual.titulo;
  document.getElementById("descripcion").textContent = libroActual.descripcion;
  document.getElementById("imagen").src = libroActual.imagen;
  document.getElementById("anio").textContent = libroActual.anio;
  document.getElementById("enlace").textContent = libroActual.enlace;

}

function cerrarDetalle() {
  document.getElementById("detalle-libro").style.display = "none";
}

function anteriorLibro() {
  indiceLibroActual--;
  if (indiceLibroActual < 0) {
    indiceLibroActual = libros.length - 1;
  }
  mostrarLibroActual();
}

function siguienteLibro() {
  indiceLibroActual++;
  if (indiceLibroActual >= libros.length) {
    indiceLibroActual = 0;
  }
  mostrarLibroActual();
}

// post blog escritora 

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    // procesa los datos de las publicaciones
  })
  .catch(error => console.error(error));

  const publicacionesDiv = document.getElementById('publicaciones');

data.forEach(publicacion => {
  const publicacionHTML = `
    <div>
      <h2>${publicacion.title}</h2>
      <p>${publicacion.body}</p>
    </div>
  `;
  publicacionesDiv.innerHTML += publicacionHTML;
});


