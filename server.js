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
    
    // If no specific route, default to home page
    if (filePath === './public/') {
        filePath = './public/home.html';
    }
    
    // Check if no extension, add .html
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
    };

    const contentType = mimeTypes[extname] || 'text/html';

    // Check if the file exists, else serve 404
    fs.exists(filePath, (exists) => {
        if (exists) {
            serveFile(filePath, contentType, res);
        } else {
            serveFile('./public/404.html', 'text/html', res);  // Serve 404 page
        }
    });
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
