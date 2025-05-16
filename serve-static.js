const handler = require('serve-handler');
const http = require('http');

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

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Press Ctrl+C to quit.');
}); 