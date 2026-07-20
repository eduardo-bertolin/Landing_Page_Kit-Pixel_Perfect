const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Preload LCP
const preloadTags = `  <!-- Preload LCP Images for Performance -->
  <link rel="preload" href="./src/assets/images/woman.png" as="image">
  <link rel="preload" href="./src/assets/images/woman-trace.png" as="image">

`;
if (!content.includes("<!-- Preload LCP Images for Performance -->")) {
    content = content.replace("  <!-- Google Fonts", preloadTags + "  <!-- Google Fonts");
}

// 2. Add fetchpriority="high"
content = content.replace(
    '<img src="./src/assets/images/woman-trace.png"', 
    '<img fetchpriority="high" decoding="async" src="./src/assets/images/woman-trace.png"'
);
content = content.replace(
    '<img src="./src/assets/images/woman.png"', 
    '<img fetchpriority="high" decoding="async" src="./src/assets/images/woman.png"'
);

// 3. Defer script
content = content.replace('<script src="./src/js/main.js"></script>', '<script src="./src/js/main.js" defer></script>');

// 4. Lazy Load
const parts = content.split('<section id="brands"');
if (parts.length === 2) {
    let headHero = parts[0];
    let rest = parts[1];
    
    rest = rest.replace(/<img /g, '<img loading="lazy" decoding="async" ');
    headHero = headHero.replace('<img src="./src/assets/icons/menu-scale.svg"', '<img decoding="async" src="./src/assets/icons/menu-scale.svg"');
    
    content = headHero + '<section id="brands"' + rest;
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Performance optimized!");
