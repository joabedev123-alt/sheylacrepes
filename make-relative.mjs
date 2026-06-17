import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');
const nextDir = path.join(outDir, '_next');
const assetsDir = path.join(outDir, 'assets_next');

if (fs.existsSync(nextDir)) {
  fs.renameSync(nextDir, assetsDir);
  console.log("Renamed _next to assets_next");
}

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, filesList);
    } else if (filePath.match(/\.(html|js|css)$/)) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

const files = getFiles(outDir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix references to /_next/ (keep it absolute)
  let newContent = content.replace(/\/_next\//g, `/assets_next/`);

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
}
console.log("Renamed _next to assets_next and kept absolute paths.");
