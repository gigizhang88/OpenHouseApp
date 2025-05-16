// This script handles routing for static site deployments
(function() {
  if (window.location.pathname.endsWith('/') || window.location.search) {
    // Path already has a trailing slash or query parameters, nothing to do
    return;
  }
  
  // Add trailing slash to ensure proper static routing
  var newPath = window.location.pathname + '/';
  if (window.location.search) {
    newPath += window.location.search;
  }
  window.history.replaceState(null, '', newPath);
})(); 