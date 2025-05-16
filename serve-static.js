const handler = require('serve-handler');
const http = require('http');
const net = require('net');

// Function to check if a port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.close();
        resolve(true);
      })
      .listen(port);
  });
}

// Function to find an available port
async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    console.log(`Port ${port} is already in use, trying ${port + 1}...`);
    port += 1;
  }
  return port;
}

// Create server handler
const server = http.createServer((request, response) => {
  // Configure serve-handler with custom options
  return handler(request, response, {
    public: 'out',
    rewrites: [
      // Redirect all paths to index.html to handle client-side routing
      { source: '/property/new', destination: '/property/new/index.html' },
      { source: '/property', destination: '/property/index.html' },
      // If a path doesn't match any files, serve 404.html which has routing logic
      { source: '**', destination: '/404.html' }
    ],
    headers: [
      {
        source: '**',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate'
          }
        ]
      }
    ]
  });
});

// Start the server on an available port
async function startServer() {
  const port = process.env.PORT || await findAvailablePort(3000);
  
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Press Ctrl+C to quit.');
  });
}

startServer().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
}); 