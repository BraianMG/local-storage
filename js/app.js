// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();
function eventListeners(){
    // Cuando el usuario agrega un nuevo Tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        // Si obtenemos un null con JSON.parse entonces asigna un arreglo vacío
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

// Funciones
function agregarTweet(e){
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if( tweet === '' ){
        mostrarError('Un mensaje no puede ir vacío');
        return; // Evita que se ejecute mas lineas de código (siempre y cuando este en una función)
    }

    const tweetObj = {
        id: Date.now(),
        tweet // En versiones recientes de JS si clave y valor tienen el mismo nombre se puede poner solo una vez
    }
    tweets = [ ...tweets, tweetObj ];
    
    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos
    setTimeout( () => {
        mensajeError.remove();
    }, 3000)
}

// Muestra un listado de los Tweets
function crearHTML(){
    limpiarHTML();

    tweets.forEach( tweet => {
        // Agregar un botón de eliminar
        const btnEliminar = document.createElement('a');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText = 'X';

        // Añadir la función de eleminar
        btnEliminar.onclick = () => {
            borrarTweet(tweet.id);
        }

        // Crear el HTML
        const li = document.createElement('li');

        // Añadir el texto
        li.textContent = tweet.tweet;

        // Asignar el botón
        li.appendChild(btnEliminar);

        // Insertarlo en el HTML
        listaTweets.appendChild(li);
    });

    sincronizarStorage();
}

// Agregar los Tweets actuales al LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un Tweet
function borrarTweet(id){

    tweets = tweets.filter( tweet => tweet.id !== id );
    crearHTML();
}

// Limpiar HTML
function limpiarHTML(){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}