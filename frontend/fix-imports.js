import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the broken import
    content = content.replace(
        "import , { useEffect, useState } from 'react';", 
        "import { useEffect, useState } from 'react';"
    );

    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in ${file}`);
});
