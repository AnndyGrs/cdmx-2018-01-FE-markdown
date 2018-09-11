# Librería "mdLinks"
*Un proyecto creado por **Andrea García**.*

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Acerca de mdLinks

`mdLinks` es una librería hecha en Javascript, con implementacion de `Node.js`, que analiza archivos en formato `.md`, busca los URLs dentro de ellos y los valida para verificar si están online, o son URL rotos.

Actualmente está en versión *Beta*, ya que todavía se encuentra en desarrollo.

**v1.3.10** *(actual)* - Al ejecutar el comando `mdLinks` muestra un arreglo de objetos que contiene la siguiente información:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
- `status`: Status de la URL (200 ó 404).

También tiene implementadas las funciones `urlStats`, que indica cuántos URLs están online y cuantos hay en total; y `statsAndValidate`, que indica cuántos URLs hay en total, cuantos de ellos están online y cuantos fallan; sin embargo, no hay comando disponible para mostrar dicha información.

## Instalación

Para poder hacer uso de `mdLinks`, es necesario instalar algunas dependencias de `Node.js`.
En tu terminal, ejecuta los siguientes comandos:

- `npm install eslint`
- `npm install node-fetch`

## Uso

Para poder usar `mdLinks` es necesario que sigas unos pasos:

1. Forkea y clona este repositorio.
2. Abre tu copia local.
3. Dentro de la carpeta *mdLinks*, está el archivo `markdown-links.js`, en la linea **5** existe una variable llamada *route*. Dentro de las comillas, escribe la ruta donde se encuentra el archivo markdown a analizar.
4. Abre tu terminal en tu carpeta local de `mdLinks`.
5. Ejecuta el comando `mdLinks`, debería aparecer en tu terminal un arreglo de objetos con la información de las URLs encontradas en tu archivo.