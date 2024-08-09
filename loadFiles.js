const fs = require('fs');
const path = require('path');

async function loadFiles(dir) {
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  const filePaths = files.map(file => path.join(dir, file));
  return filePaths;
}

module.exports = { loadFiles };
