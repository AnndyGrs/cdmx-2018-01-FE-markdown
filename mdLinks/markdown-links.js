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
  let rgEx = /(http:\/\/|https:\/\/|www\.)[^\s]+/gim;
  let arrLinks = data.match(rgEx);
  let links = [];
  let i = 0;
  for (i; i < arrLinks.length; i++) {
    links[i] = arrLinks[i].slice(0, -1);
  }
  console.log(links); 
};