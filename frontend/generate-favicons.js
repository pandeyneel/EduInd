import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgPath = path.resolve('public/favicon.svg');
const publicDir = path.resolve('public');

if (!fs.existsSync(svgPath)) {
  console.error(`Error: Source SVG not found at ${svgPath}`);
  process.exit(1);
}

const targets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateFavicons() {
  try {
    console.log('Generating PNG favicon sizes from SVG...');
    
    // Generate PNG files
    for (const target of targets) {
      const outputPath = path.join(publicDir, target.name);
      await sharp(svgPath)
        .resize(target.size, target.size)
        .png()
        .toFile(outputPath);
      console.log(`Generated ${target.name} (${target.size}x${target.size})`);
    }

    // Generate favicon.ico using a 32x32 PNG wrapped in ICO container
    console.log('Generating favicon.ico...');
    const png32Buffer = await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toBuffer();

    const icoHeader = Buffer.alloc(22);
    icoHeader.writeUInt16LE(0, 0);     // Reserved
    icoHeader.writeUInt16LE(1, 2);     // Type: ICO
    icoHeader.writeUInt16LE(1, 4);     // Number of images: 1
    icoHeader.writeUInt8(32, 6);       // Width: 32
    icoHeader.writeUInt8(32, 7);       // Height: 32
    icoHeader.writeUInt8(0, 8);        // Color palette
    icoHeader.writeUInt8(0, 9);        // Reserved
    icoHeader.writeUInt16LE(1, 10);    // Planes
    icoHeader.writeUInt16LE(32, 12);   // Bits per pixel
    icoHeader.writeUInt32LE(png32Buffer.length, 14); // Size of PNG data
    icoHeader.writeUInt32LE(22, 18);   // Offset of PNG data

    const icoBuffer = Buffer.concat([icoHeader, png32Buffer]);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('Generated favicon.ico (32x32 PNG wrapped)');

    console.log('All favicon assets generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
