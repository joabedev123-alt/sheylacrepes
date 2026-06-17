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
  
  let relativePath = path.relative(path.dirname(file), outDir).replace(/\\/g, '/');
  let prefix = relativePath === '' ? '.' : relativePath;

  // Fix references to /_next/
  let newContent = content.replace(/\/_next\//g, `${prefix}/assets_next/`);
  
  // Replace absolute root links like href="/contato" to relative
  // Only doing this for the basic routes to ensure maximum compatibility if opened directly
  newContent = newContent.replace(/href="\/([^"]*)"/g, (match, p1) => {
    if (p1.startsWith('_next') || p1.startsWith('assets_next') || p1.startsWith('http') || p1.startsWith('#')) return match;
    return `href="${prefix}/${p1}"`;
  });

  newContent = newContent.replace(/src="\/([^"]*)"/g, (match, p1) => {
    if (p1.startsWith('_next') || p1.startsWith('assets_next') || p1.startsWith('http')) return match;
    return `src="${prefix}/${p1}"`;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
  }
}
console.log("Paths converted to relative and _next folder completely removed/renamed.");
