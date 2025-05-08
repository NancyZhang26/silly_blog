/**
 * Delete if needed.
 * Ultra-simple fix for server navigation issues
 * Add this to your HTML right before </body>
 */
(function() {
    // Force direct navigation - simplest possible approach
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;
      
      // Only handle internal links
      if (link.hostname === window.location.hostname) {
        console.log('Navigating to:', link.href);
        
        // If URL has "/posts/" in it, ensure direct navigation
        if (link.href.includes('/posts/')) {
          e.preventDefault();
          window.location.href = link.href; // Force direct navigation
        }
      }
    });
    
    // Log for debugging
    console.log('Server navigation fix loaded');
  })();