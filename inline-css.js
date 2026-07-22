const fs = require('fs');
const path = require('path');

const distIndex = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(distIndex)) {
  let html = fs.readFileSync(distIndex, 'utf8');
  
  // Find external CSS link tag in dist/index.html
  const cssMatch = html.match(/<link rel="stylesheet"[^>]+href="([^"]+\.css)"[^>]*>/);
  if (cssMatch) {
    const cssRelPath = cssMatch[1].replace(/^\//, '');
    const cssPath = path.join(__dirname, 'dist', cssRelPath);
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      // Replace external link with inlined <style> tag
      html = html.replace(cssMatch[0], `<style>${cssContent}</style>`);
      fs.writeFileSync(distIndex, html);
      console.log('Successfully inlined CSS into dist/index.html (Eliminated render-blocking CSS HTTP request)!');
    }
  }
}
