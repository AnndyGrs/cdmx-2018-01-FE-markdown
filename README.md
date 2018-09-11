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

**v1.3.8** *(actual)* - Al ejecutar el comando `mdLinks` muestra un arreglo de objetos que contiene la siguiente información:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
- `status`: Status de la URL (200 ó 404).

También tiene implementadas las funciones `urlStats`, que indica cuántos URLs están online y cuantos hay en total; y `statsAndValidate`, que indica cuántos URLs hay en total, cuantos de ellos están online y cuantos fallan; sin embargo, no hay comando disponible para mostrar dicha información.