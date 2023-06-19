## MVC-API
Este proyecto es una aplicación web basada en el patrón de diseño Modelo-Vista-Controlador (MVC) que utiliza una API para obtener información de los pokémon. Está desarrollado en el entorno .NET utilizando el lenguaje de programación C#.

# Descripción
La aplicación permite visualizar una lista de pokémon y obtener detalles sobre cada uno de ellos. Utiliza la arquitectura MVC para separar la lógica de negocio, la presentación y el manejo de las solicitudes.

La comunicación con la API de pokémon se realiza a través de peticiones HTTP utilizando la biblioteca jQuery y AJAX. La información se presenta de manera estructurada y amigable para el usuario mediante vistas HTML y estilos CSS.

# Funcionalidades
- Mostrar una lista de pokémon con su ID y nombre.
- Obtener detalles de un pokémon seleccionado, como peso, altura e imagen.
- Visualizar los detalles en un modal interactivo.
- Navegar entre los diferentes pokémon de la lista.

# Estructura del proyecto
El proyecto sigue una estructura MVC convencional:
- Models: Contiene las clases de modelo que representan los objetos de dominio, como los pokémon. 
- Views: Contiene las vistas HTML para mostrar la interfaz de usuario.
- Controllers: Contiene los controladores que manejan las solicitudes y coordinan las acciones entre los modelos y las vistas.
- Scripts: Contiene los archivos JavaScript necesarios para la interacción con la API y la manipulación del DOM.
- Styles: Contiene los archivos CSS para aplicar estilos a las vistas.
