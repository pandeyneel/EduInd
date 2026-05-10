import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const indexFile = 'index.html';

// Fix index.html
if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, 'utf8');
    content = content.replace(/EduCore Pro/g, 'EduInd');
    fs.writeFileSync(indexFile, content);
    console.log('Fixed index.html');
}

// Fix pages
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes("EduCore Pro")) {
        content = content.replace(/EduCore Pro/g, 'EduInd');
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${file}`);
    }
});
