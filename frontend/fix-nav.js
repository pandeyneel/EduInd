import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

const links = [
    { text: 'Admin Dashboard', to: '/dashboard' },
    { text: 'Student Directory', to: '/students' },
    { text: 'Fee Management', to: '/fees' },
    { text: 'Academic Hub', to: '/academic' },
    { text: 'Staff Directory', to: '/staff' },
    { text: 'Parent Portal', to: '/portal' }
];

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes("import { Link } from 'react-router-dom';")) {
        content = content.replace("import React", "import React from 'react';\nimport { Link } from 'react-router-dom';\nimport ");
    }

    // Since regex over multiple lines with unknown formatting is tricky, we can do this:
    // We replace `<a ... href="#">...Text...</a>`
    
    links.forEach(link => {
        // Regex to match `<a ... href="#" ... > ... link.text ... </a>`
        // We use a non-greedy match for everything inside the tag.
        const regex = new RegExp(`<a([^>]*?)href="#"([^>]*?)>([\\s\\S]*?${link.text}[\\s\\S]*?)<\\/a>`, 'g');
        content = content.replace(regex, `<Link$1to="${link.to}"$2>$3</Link>`);
    });

    fs.writeFileSync(filePath, content);
    console.log(`Fixed links in ${file}`);
});
