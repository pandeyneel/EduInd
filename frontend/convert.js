import fs from 'fs';
import path from 'path';

const rawDir = 'src/raw-screens';
const pagesDir = 'src/pages';

if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir);
}

const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const html = fs.readFileSync(path.join(rawDir, file), 'utf8');
    
    // Extract body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';

    // Convert to JSX
    let jsx = bodyContent
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--[\s\S]*?-->/g, '') // remove comments
        .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
        .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
        .replace(/<br([^>]*[^\/])>/g, '<br$1 />')
        .replace(/<hr([^>]*[^\/])>/g, '<hr$1 />')
        .replace(/colspan=/g, 'colSpan=')
        .replace(/viewbox=/g, 'viewBox=')
        .replace(/checked="[^"]*"/g, 'defaultChecked')
        .replace(/disabled="[^"]*"/g, 'disabled')
        // Fix some inline styles (Stitch uses very few, mostly font-variation-settings)
        .replace(/style="([^"]*)"/g, (match, p1) => {
            const rules = p1.split(';').filter(r => r.trim());
            const styleObj = rules.reduce((acc, rule) => {
                const parts = rule.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim();
                    const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
                    acc.push(`'${camelKey}': ${JSON.stringify(value)}`);
                }
                return acc;
            }, []);
            return `style={{${styleObj.join(', ')}}}`;
        });

    const componentName = file.replace('.html', '');
    
    const componentCode = `import React, { useEffect, useState } from 'react';
import { fetchBackendData } from '../api';

export default function ${componentName}() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Connect to .NET backend
        fetchBackendData('${componentName}').then(setData).catch(console.error);
    }, []);

    return (
        <>
            ${jsx}
        </>
    );
}
`;

    fs.writeFileSync(path.join(pagesDir, `${componentName}.tsx`), componentCode);
    console.log(`Generated ${componentName}.tsx`);
});
