const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve HTML files
function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    let filePath = './public' + req.url;
    if (filePath === './public/') {
        filePath = './public/index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
    };

    const contentType = mimeTypes[extname] || 'text/html';

    fs.exists(filePath, (exists) => {
        if (exists) {
            serveFile(filePath, contentType, res);
        } else {
            serveFile('./public/404.html', 'text/html', res);
        }
    });
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
