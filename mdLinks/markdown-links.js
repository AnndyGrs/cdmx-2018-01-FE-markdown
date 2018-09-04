const fs = require('fs');
const fetch = require('node-fetch');
// const path = require('path');

// const validatePath = () => {
//   let pathFile = path.isAbsolute();
//   if (pathFile === true) {
//     return pathFile;
//   } else {
//     pathFile = path.resolve(pathFile);
//   }
//   return pathFile;
// };

const readFile = (errCallback, callBack) => {
  fs.readFile('../README.md', 'utf8', (err, data) => {
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
  const rgExText = /\[[a-zA-Z_ -\/$]*\]/gim;
  const arrText = data.match(rgExText);
  const arrLinks = data.match(rgExLink);
  for (let i = 0; i < arrText.length; i++) {
    arrText[i] = arrText[i].slice(1, -1);
  }
  for (let i = 0; i < arrLinks.length; i++) {
    arrLinks[i] = arrLinks[i].slice(0, -1);
    fetch(arrLinks[i]).then((response) => {
      let status = response.status;
      if (status === 200) {
        console.log('Texto: ' + arrText[i] + ', Link: ' + arrLinks[i] + ', Status: ' + status + ' OK');
      } else {
        console.log('Texto: ' + arrText[i] + ', Link: ' + arrLinks[i] + ', Status: ' + status + ' FAIL');
      }
    })
      .catch((err) => {
        console.log(err.message);
      });
  }
};