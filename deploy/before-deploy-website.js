import fs from 'fs';
import path from 'path';
import { cpSync } from 'fs';

const spaScript = `
<!-- Start Single Page Apps for GitHub Pages -->
<script type="text/javascript">
// Single Page Apps for GitHub Pages
// MIT License
// https://github.com/rafgraph/spa-github-pages
(function(l){if(l.search[1]==='/'){var d=l.search.slice(1).split('&').map(s=>s.replace(/~and~/g,'&')).join('?');window.history.replaceState(null,null,l.pathname.slice(0,-1)+d+l.hash)}})(window.location)
</script>
<!-- End Single Page Apps for GitHub Pages -->
`;

// 1. Deep copy deploy/docs -> docs
cpSync('deploy/include', 'docs/', { recursive: true });

// 2. Insert SPA script into index.html
const indexFile = path.join('docs', 'index.html');
let html = fs.readFileSync(indexFile, 'utf-8');

// Find <title> tag and insert after it
html = html.replace(/(<title>.*?<\/title>)/, `$1\n${spaScript}`);

fs.writeFileSync(indexFile, html, 'utf-8');

console.log('Docs copied and SPA script injected!');
