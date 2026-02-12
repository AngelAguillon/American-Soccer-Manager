const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// CHANGE: This now points to your game file
const DEFAULT_FILE = './index.html';

http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // If user goes to "localhost:3000/", serve the game
    if (filePath === './') filePath = DEFAULT_FILE;

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.csv': contentType = 'text/csv'; break; 
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT'){
                // If file missing, try serving the default
                console.log(`File not found: ${filePath}`);
                res.writeHead(404);
                res.end(`File not found: ${filePath}`);
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

}).listen(PORT);

console.log(`\n✅ Server running! Open: http://localhost:${PORT}`);