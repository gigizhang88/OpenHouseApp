// Add trailing slashes to paths to ensure proper routing with static export
export function getPathWithTrailingSlash(path: string) {
  // If the path already has a trailing slash or contains a query parameter, return as is
  if (path.endsWith('/') || path.includes('?')) {
    return path;
  }
  
  // Otherwise add a trailing slash
  return `${path}/`;
}

// Ensure query parameters are added correctly for property routes
export function createPropertyLink(propertyId: string) {
  // For static serving, we need to ensure the path format matches the generated files
  return `/property/?id=${propertyId}`;
}

// Helper for handling client-side navigation with the router
export function navigateTo(router: any, path: string) {
  // Add trailing slash for consistent navigation
  const formattedPath = getPathWithTrailingSlash(path);
  router.push(formattedPath);
} 