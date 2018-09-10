const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const route = '../README.md';

const mdLinks = (route) => {
  return new Promise((resolve, reject) => {
    if (!route) return reject('Error en mdLinks');
    return resolve(route);
  });
};

mdLinks(route)
  .then(result => validatePath(result))
  .then(result => readFile(result))
  .then(result => getUrl(result))
  .then(result => validateURL(result))
  .then(result => urlStats(result))
  .then(result => statsAndValidate(result))
  .catch(err => {
    console.log('Error: ', err);
  });

const validatePath = (route) => {
  return new Promise((resolve, reject) => {
    if (!route) return reject('Error en ruta');
    return resolve(path.resolve(route));
  });
};

const readFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', ((err, data) => {
      if (err) return reject('Error al leer el archivo');
      return resolve(data);
    }));
  });
};

const getUrl = (data) => {
  return new Promise((resolve, reject) => {
    if (!data) return reject('Error al conseguir links');
    const rgExLink = /(http:\/\/|https:\/\/|www\.)[^\s]+/gim;
    const rgExText = /\[[\¿A-Za-záéíóúÁÉÍÓÚ_ \.\?\(\)\\\/\-$]*\]\(/gim;
    const arrText = data.match(rgExText);
    const arrLinks = data.match(rgExLink);
    for (let i = 0; i < arrText.length; i++) {
      arrText[i] = arrText[i].slice(1, -2);
    }
    for (let i = 0; i < arrLinks.length; i++) {
      arrLinks[i] = arrLinks[i].slice(0, -1);
    }
    let info = [];
    for (let i = 0; i < arrLinks.length; i++) {
      info.push({
        href: arrLinks[i],
        text: arrText[i],
        file: validatePath(route)
      });
    };
    return resolve(info);
  });
};


const validateURL = (info) => {
  return new Promise((resolve, reject) => {
    if (!info) return reject('Error al validar links');
    let urlStatus = info.map((obj) => {
      return { status: '', ...obj }
    });
    urlStatus.forEach(links => {
      fetch(links.href).then((response) => {
        if (response.status === 404) {
          links.status = '404 FAIL';
        } else {
          links.status = '200 OK';
        }
        console.log(urlStatus);
        return resolve(urlStatus);
      });
    });
  });
};

const urlStats = (urlStatus) => {
  return new Promise((resolve, reject) => {
    if (!urlStatus) return reject('Error al leer status');
    let total = 0;
    let unique = 0;
    let broken = 0;
    urlStatus.forEach(links => {
      if (links.status == '200 OK') {
        unique++;
      } else {
        broken++;
      }
    });
    total = unique + broken;
    return resolve(total, unique);
  });
};

const statsAndValidate = (urlStatus) => {
  return new Promise((resolve, reject) => {
    if (!urlStatus) return reject('Error al leer status');
    let unique = 0;
    let broken = 0;
    let total = 0;
    urlStatus.forEach(links => {
      if (links.status == '200 OK') {
        unique++;
      } else {
        broken++;
      }
    });
    total = unique + broken;
    return resolve(total, unique, broken);
  });
};

module.exports = mdLinks;