const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const route = '../README.md';

const validatePath = (route) => {
  if (route === undefined) {
    console.log('No es una ruta valida');
  } else {
    route = path.resolve(route);    
    return route;
  }
};

const readFile = (errCallback, callBack) => {
  fs.readFile(route, 'utf8', (err, data) => {
    if (err) {
      errCallback(err);
    } else {
      callBack(data);
    }
  });
};

readFile((err) => console.log(err), data => getUrl(data));

const getUrl = (data) => {
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
  }
  validateURL(info);
};

const validateURL = (info) => {
  let urlStatus = info.map((obj) => {
    return { status: '', ...obj }
  });
  urlStatus.forEach(links => {
    fetch(links.href).then((response) => {
      if (response.status === 404) {
        links.status = `${response.status} FAIL`;
      } else {
        links.status = `${response.status} OK`;
      }
      console.log(urlStatus);
      urlStats(urlStatus);
      statsAndValidate(urlStatus);
    });
  });
};

const urlStats = (urlStatus) => {
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
  console.log('Total: ' + total + ', Unique: ' + unique);
  return console.log(total, unique);  
};

const statsAndValidate = (urlStatus) => {
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
  console.log('Total: ' + total + ', Unique: ' + unique + ', Broken: ' + broken);
  return total, unique, broken;
};