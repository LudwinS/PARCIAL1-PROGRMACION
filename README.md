Integrantes:
-Kriscia Tatiana Del Cid Argueta
-Edwin Saúl Vasquez Romero

Descripción de la solución:
Como estudiantes de ingenieria en sistemas, nos dimos cuenta que 
el area de biologia tenia que consultar las especies pokemon en 
diferentes libros, ademas para los entrenadores era demasiado dificil
llevar consigo un libro, por lo que creamos una web que permite 
consultar los pokemon existentes de forma rapida solo poniendo el 
nombre.

Preguntas:
1-¿Qué valor agregado tiene el uso de webcomponents a su proyecto?
R/El principal valor agregado es la modularidad y el encapsulamiento
 del código. Al utilizar WebComponents, la Pokédex de Kalos se 
 comporta como una pieza de software independiente que no interfiere 
 con el resto de la página institucional de la UGB. Gracias al Shadow 
 DOM, los estilos visuales (el color rojo metalizado, las fuentes de 
 neón y las animaciones de la interfaz) quedan protegidos; esto 
 significa que si quisiéramos añadir más herramientas a la página en 
 el futuro, el CSS de la Pokédex no "rompería" el diseño global. 
 Además, esto facilita enormemente la reutilización: el componente 
 <kalos-pokedex> podría copiarse y pegarse en cualquier otro proyecto 
 web y funcionaría de inmediato sin configuraciones extra.

2.¿De qué forma manipularon los datos sin recargar la página?
R/La manipulación de datos se gestionó mediante el uso de programación
asíncrona y la interceptación de eventos. En el archivo JavaScript, se 
implementó un escuchador de eventos para el envío del formulario 
(submit), utilizando la función event.preventDefault() para evitar que
el navegador realizara la acción por defecto de refrescar la pantalla. 
Posteriormente, se utilizó la API Fetch con la sintaxis de async/await 
para obtener los datos desde la PokéAPI en segundo plano. Una vez que 
el servidor externo devuelve la información del Pokémon, el motor de 
JavaScript actualiza dinámicamente el innerHTML del contenedor de 
visualización dentro del componente, logrando una experiencia de 
usuario fluida y reactiva típica de una Single Page Application (SPA).

3.¿De qué forma validaron las entradas de datos? Expliquen brevemente
R/La validación se realizó en dos niveles para garantizar la 
integridad de la información. Primero, se aplicó una validación lógica 
del lado del cliente antes de realizar cualquier petición a la base de 
datos externa; esto incluye el uso del método .trim() para eliminar 
espacios en blanco accidentales y verificar que el campo de búsqueda 
no esté vacío, así como comprobar que el elemento select tenga una 
opción válida seleccionada. En segundo lugar, se implementó un bloque 
de control de errores try...catch para gestionar las respuestas de la 
API. Si el usuario ingresa un nombre que no existe, el sistema captura 
el error 404 y muestra un mensaje informativo en pantalla en lugar de 
permitir que la aplicación deje de funcionar.

4.¿Cómo manejaría la escalabilidad futura en su página?
R/Para escalar este proyecto, la estrategia principal sería la 
composición de componentes y la gestión de estado persistente. Gracias 
a la arquitectura de WebComponents, podríamos crear nuevos módulos 
independientes, como un <equipo-pokemon> o un 
<comparador-estadisticas>, que se integren de forma natural con la 
Pokédex actual. A nivel de datos, la escalabilidad implicaría conectar 
la aplicación con una base de datos más robusta (como Supabase o 
Firebase) mediante el uso de servicios externos para permitir que cada 
estudiante de la universidad guarde sus propios registros de forma 
permanente. Finalmente, se podría implementar un sistema de "Lazy 
Loading" para las imágenes de alta resolución, asegurando que la 
aplicación siga siendo rápida y eficiente a medida que se añadan más 
funcionalidades y usuarios.
