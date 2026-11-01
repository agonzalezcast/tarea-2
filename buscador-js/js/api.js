const URL_BUSQUEDA = 'https://openlibrary.org/search.json?q='

// GET: busca libros por nombre y devuelve un arreglo de series 

export async function buscarLibros(texto) {
    const respuesta = await fetch(URL_BUSQUEDA + encodeURIComponent(texto) + '&limit=12')

    if (!respuesta.ok) {
        throw new Error('La API respondió con el códio ' + respuesta.status)
    }

    const datos = await respuesta.json()

    return datos.docs;
}

