# Estantería Común

**Tarea 2 — SOFT-12**

**Estudiante:** Alexander González Castillo  
**Sección:** SCV2  
**Período:** III cuatrimestre 2026  
**Docente:** Álvaro Cordero Peña

## Descripción

Estantería Común es un proyecto web orientado a la búsqueda y administración de libros para un club de lectura. Está dividido en dos aplicaciones independientes que permiten aplicar distintos enfoques de desarrollo de interfaces interactivas.

- **Parte A — Buscador con JavaScript:** aplicación desarrollada con HTML, JavaScript nativo, Bootstrap y Sass. Permite buscar libros en Open Library, consultar sus detalles, administrar una lista de lectura y enviar propuestas mediante un formulario.
- **Parte B — Tablero con React:** aplicación desarrollada con React, Vite y Bootstrap. Permite administrar una colección de libros, cambiar estados, aplicar filtros, consultar un resumen y agregar nuevos libros mediante un formulario controlado.

## Estructura del repositorio

```text
tarea-2/
├── buscador-js/
│   ├── css/
│   │   └── main.css
│   ├── img/
│   │   └── sin-imagen.svg
│   ├── js/
│   │   ├── api.js
│   │   ├── estados.js
│   │   ├── lista-lectura.js
│   │   ├── main.js
│   │   ├── propuestas.js
│   │   ├── render.js
│   │   └── validaciones.js
│   ├── scss/
│   │   ├── _componentes.scss
│   │   ├── _mixins.scss
│   │   ├── _variables.scss
│   │   └── main.scss
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── tablero-react/
│   ├── public/
│   ├── src/
│   │   ├── componentes/
│   │   │   ├── comunes/
│   │   │   ├── filtros/
│   │   │   ├── formulario/
│   │   │   ├── layout/
│   │   │   ├── libros/
│   │   │   └── resumen/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── estilos.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── docs/
│   ├── capturas/
│   └── depuracion.md
├── .gitignore
└── README.md
```

**Nota:** la carpeta `docs/capturas/` se utiliza para almacenar las capturas de las pruebas y depuración.

## Cómo ejecutar el proyecto

### Requisitos

- Node.js y npm instalados.
- Visual Studio Code o un editor equivalente.
- Navegador web moderno.
- Conexión a Internet para utilizar Open Library y JSONPlaceholder.

### Parte A — Buscador con JavaScript

1. Abrir una terminal en la carpeta `buscador-js`.

2. Instalar las dependencias:

```bash
npm install
```

3. Compilar los archivos Sass:

```bash
npm run sass
```

4. Para compilar automáticamente los cambios de Sass durante el desarrollo:

```bash
npm run sass:watch
```

5. Abrir `index.html` utilizando un servidor local, por ejemplo, Live Server de Visual Studio Code.

Se utiliza un servidor local porque la aplicación trabaja con módulos JavaScript mediante `import` y `export`.

### Parte B — Tablero con React

1. Abrir otra terminal en la carpeta `tablero-react`.

2. Instalar las dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir la dirección local indicada por Vite.

Para generar una compilación de producción:

```bash
npm run build
```

## Parte A — Funcionalidades

### Búsqueda de libros

- Búsqueda por título, autor o palabra clave.
- Solicitudes GET a la API de Open Library mediante `fetch`.
- Renderizado dinámico de tarjetas con información de los libros.
- Visualización de portada, título, autores y año de publicación.
- Mensajes de carga, error y ausencia de resultados.
- Modal de Bootstrap para consultar información adicional.

### Lista de lectura

- Agregar libros desde los resultados de búsqueda.
- Evitar libros duplicados mediante su identificador.
- Administrar los estados `Pendiente`, `Leyendo` y `Leído`.
- Cambiar estados mediante botones.
- Eliminar libros de la lista.
- Mostrar un mensaje cuando la lista está vacía.
- Aplicar transiciones al agregar, cambiar estados y eliminar libros.

### Formulario de propuestas

- Registro de una propuesta de lectura.
- Campos para título, autores, año, páginas, género, correo, fecha y motivo.
- Campos dinámicos para agregar entre uno y cinco autores.
- Validaciones mediante Constraint Validation API.
- Mensajes de error junto a los campos inválidos.
- Envío de datos en formato JSON mediante una solicitud POST.
- Alertas de Bootstrap para informar el resultado.

El servicio JSONPlaceholder se utiliza para simular el envío de propuestas. No proporciona almacenamiento permanente de los registros enviados.

## Parte B — Funcionalidades

### Administración de libros

- Visualización de una colección inicial de libros.
- Componentes reutilizables para tarjetas, listas, filtros y resumen.
- Administración de los libros mediante `useState`.
- Cambio de estado entre `Pendiente`, `Leyendo` y `Leído`.
- Eliminación de libros sin recargar la página.

### Filtros y resumen

- Filtro por estado de lectura.
- Filtro por miembro que propuso el libro.
- Combinación de ambos filtros.
- Mensaje cuando ningún libro coincide con los filtros.
- Conteo automático de libros por estado.

### Formulario controlado

- Campos para título, autor y miembro.
- Administración de los valores mediante `useState`.
- Validaciones antes de agregar un libro.
- Mensajes de error para campos inválidos.
- Creación de nuevos libros con estado inicial `Pendiente`.
- Actualización automática del listado y del resumen.
- Limpieza del formulario después de agregar un libro.

## Decisiones de diseño

### Bootstrap instalado localmente

Bootstrap se instaló mediante npm en ambas aplicaciones, sin utilizar CDN.

En la Parte A se integró Bootstrap con Sass para personalizar colores, tipografía y bordes.

En la Parte B se utilizó Bootstrap mediante una importación local y se añadieron estilos propios para mantener una identidad visual similar.

### Organización de Sass

Los estilos de la Parte A se dividieron en archivos parciales:

- `_variables.scss`: colores, tipografía, bordes y función Sass.
- `_mixins.scss`: mixins reutilizables.
- `_componentes.scss`: estilos de los componentes, anidamiento, diseño responsive y personalización de Bootstrap.
- `main.scss`: punto de entrada para la compilación.

Se utilizaron variables, mixins, funciones, anidamiento y variables CSS para mejorar la organización y reutilización de estilos.

### Diseño responsive

Se utilizó un enfoque mobile-first.

En la Parte A, las tarjetas de resultados se organizan mediante CSS Grid y los elementos internos utilizan Flexbox.

Los media queries modifican la cantidad de columnas y la distribución de botones según el ancho de pantalla.

En la Parte B se utiliza el sistema de columnas y las clases responsive de Bootstrap.

### Manipulación del DOM

En la Parte A se utilizaron métodos como:

- `document.createElement()`
- `append()`
- `replaceChildren()`
- `remove()`
- `querySelector()`

La lista de lectura utiliza delegación de eventos para administrar botones pertenecientes a elementos creados dinámicamente.

### Componentes y estado en React

En la Parte B se utilizaron componentes funcionales, props, `children`, eventos y renderizado condicional.

El estado principal de los libros se administra en `App.jsx` mediante `useState`.

Los componentes reciben datos y funciones mediante props, lo que permite mantener una fuente común de información.

Los filtros y conteos se calculan a partir del arreglo de libros, evitando almacenar estados derivados innecesarios.

Las modificaciones del arreglo se realizan de forma inmutable mediante `map`, `filter` y el operador de propagación (`...`).

## Comparación entre JavaScript nativo y React

| Característica | JavaScript nativo | React |
|---|---|---|
| Interfaz | Manipulación directa del DOM | Renderizado declarativo |
| Organización | Módulos y funciones | Componentes reutilizables |
| Administración de datos | Variables, arreglos y objetos | Estado con `useState` |
| Eventos | `addEventListener` | `onClick`, `onChange`, `onSubmit` |
| Actualización de elementos | Modificación manual del DOM | Renderizado según el estado |
| Formularios | Lectura y validación de campos | Entradas controladas |
| Reutilización | Funciones y módulos | Componentes y props |

JavaScript nativo permite controlar directamente los elementos de la página, mientras que React facilita la sincronización de los datos con la interfaz.

Ambos enfoques permiten desarrollar aplicaciones interactivas, pero utilizan diferentes mecanismos para administrar los cambios visuales.


## Depuración y pruebas

Se utilizaron las herramientas de desarrollador del navegador para verificar el funcionamiento de la aplicación.

Las pruebas incluyeron:

- Uso de breakpoints para inspeccionar variables y el flujo de ejecución.
- Análisis de solicitudes GET y POST mediante Network.
- Verificación de códigos HTTP y tiempos de respuesta.
- Pruebas funcionales de búsqueda, lista de lectura y formularios.
- Pruebas de administración de libros, filtros y estados en React.

Las evidencias y resultados se encuentran en [docs/depuracion.md](docs/depuracion.md).

 
## Resumen de commits
 
| # | Fecha      | Hash    |                         Mensaje                       | Zona   | Cambio        |
|---|------------|---------|-------------------------------------------------------|--------|---------------|
| 1 | 2026-10-30 | 5a5cfed | Crear estructura de la tarea 2 y documentación inicial | Global | Carpetas |
| 2 | 2026-10-31 | c10ba87 | Estructura HTML del buscador con bootstrap creada | Buscador-js | Estructura HTML |
| 3 | 2026-10-31 | 27babd6 | Configurar sass y personalizar variables de bootstrap | Buscador-js | Archivos scss |
| 4 | 2026-11-01 | 1a2e4b3 | Implementar diseño adaptable con CSS Grid/flexbox y sass | Buscador-js | Archivos scss |
| 5 | 2026-11-01 | 537a58c | Implementación de busqueda de libros con Open Library | Buscador-js | api.js y main.js |
| 6 | 2026-11-01 | a8b8185 | Renderizado de tarjetas de libros dinámicamente | Buscador-js | render.js y main.js |
| 7 | 2026-11-01 | 736cea4 | Implementación del modal de detalles de libros | Buscador-js | render.js y main.js |
| 8 | 2026-11-01 | 2c4de06 | Agregar libros a lista de lectura | Buscador-js | lista-lectura.js y render.js |
| 9 | 2026-11-01 | b0ef820 | Implementación de cambiar estados y eliminar libros de la lista de lectura | Buscador-js | lista-lectura.js y estados.js |
| 10 | 2026-11-01 | 26cb6a2 | Agregar transiciones a la lista de lectura | Buscador-js | Archivos js y scss |
| 11 | 2026-11-01 | a9e86a8 | Implementación del formulario de propuestas con autores dinámicos | Buscador-js | Archivos js y scss |
| 12 | 2026-11-01 | 760d220 | Validación de campos y envío de propuestas con fetch | Buscador-js | Archivos js y scss |
| 13 | 2026-11-01 | 024d36a | Creación de componentes y listado básico de libros en React | tablero-react | archivos jsx y css |
| 14 | 2026-11-01 | 980cdc0 | Administración de estados y eliminación de libros con useState | tablero-react | archivos jsx y css |
| 15 | 2026-11-01 | dfa8c9b | Nuevo: filtros y resumen de lecturas / Cambios: Estructura ajustada | tablero-react | Estructura general |
| 16 | 2026-11-01 | 392a5f3 | Implementación del formulario para agregar libros | tablero-react | validarLibro.js, FormularioLibro.jsx y App.jsx |

Los ajustes finales y la documentación se incorporaron en un commit posterior. El historial completo puede consultarse en GitHub.