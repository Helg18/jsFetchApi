// definir el endpoint base
const URLBASE = 'https://dog.ceo/api/breeds/image/random';

// obtener el elemento del boton
const getNewDog = document.getElementById("getDog");

// Definiendo la funcion asincrona para obtener perro
async function getDogFromApi(params) {
    const response = await fetch(URLBASE);

    // deshabilitando el boton 
    getNewDog.setAttribute('disabled', 'disabled');
    getNewDog.textContent = 'Loading a new dog for you!'

    try {
        if (!response.ok) { // verificando que el api no devuelva un error
            // mensaje de error del api
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // obteniendo la respuesta de la api
        const perrito = await response.json();

        // mostrando el perrito que se obtuvo de la api
        mostrarPerrito(perrito.message);

        // habiliitando el boton
        getNewDog.removeAttribute('disabled')
        getNewDog.textContent = 'Get a new dog'

    } catch (error) { // manejando el error del navegador
        console.error(`El error al obtener un perrito es ${error}`);

        // habilitando el boton
        getNewDog.removeAttribute('disabled')
        getNewDog.textContent = 'Get a new dog';
    }
}


// seteando el perrito en el atributo src de la etiqueta img
function mostrarPerrito(url) {
    const lienzo = document.getElementById('perro')
    lienzo.setAttribute('src', url);
}

// agregando un listener al evento click 
getNewDog.addEventListener('click', () => {
    getDogFromApi();
});

