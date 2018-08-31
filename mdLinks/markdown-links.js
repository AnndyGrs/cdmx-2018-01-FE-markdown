const fs = require('fs');

const readFile = () => {
  fs.readFile('../README.md', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      callBack(data);            
    }
  });
};

readFile(callBack = data => getUrl(data));

const getUrl = (data) => {
  let rgExLink = /(http:\/\/|https:\/\/|www\.)[^\s]+/gim;
  let rgExText = /\[[A-Z_ \/$]*\]/gim;
  let arrText = data.match(rgExText);
  let arrLinks = data.match(rgExLink);
  let links = [];
  let text = [];
  let i = 0;
  for (i; i < arrLinks.length; i++) {
    links[i] = arrLinks[i].slice(0, -1);
  }
  let j = 0;
  for (j; j < arrText.length; j++) {
    text[j] = arrText[j].slice(1, -1);
  }
  let k = 0;
  let info = [];
  for (k; k < text.length; k++) {
    info.push(text[k] + ' => ' + links[k]);
  }
  console.log(info);  
};