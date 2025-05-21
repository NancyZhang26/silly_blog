// Title-based authentication system
(function() {
    // Configuration - Add the correct answers here
    const correctAnswers = [
      "nicotine",
      "chemical formula for nicotine", 
      "nic",
      "nicotine formula",
      "formula for nicotine",
      "addiction",
      "vaping",
      "smoking"
    ];
    
    // Custom welcome messages
    const welcomeMessages = {
      "default": "Such a smartie... Hope you enjoy this post :)"
    };
    
    // The IDs of blog posts that require authentication
    const restrictedPostIds = ["hotgrillep1", "hotgrillep2"];
    
    // Check if we're on a restricted post
    function isRestrictedPost() {
      const currentPath = window.location.pathname.toLowerCase();
      
      // Check each restricted post ID
      for (let i = 0; i < restrictedPostIds.length; i++) {
        const postId = restrictedPostIds[i];
        if (currentPath.includes(postId) || 
            currentPath.includes("/posts/" + postId) || 
            currentPath.includes("/posts/" + postId + "/")) {
          return true;
        }
      }
      
      return false;
    }
    
    // Check if user has already been authenticated
    function isAuthenticated() {
      return sessionStorage.getItem('title_auth') === 'true';
    }
    
    // Set the authentication status
    function setAuthenticated(status) {
      sessionStorage.setItem('title_auth', status);
    }
    
    // Create and show the modal
    function showAuthModal() {
      // Clear any existing modal first
      const existingModal = document.querySelector('.auth-overlay');
      if (existingModal) {
        document.body.removeChild(existingModal);
      }
      
      // Create modal elements
      const overlay = document.createElement('div');
      overlay.className = 'auth-overlay';
      
      const modal = document.createElement('div');
      modal.className = 'auth-modal';
      
      const title = document.createElement('h2');
      title.textContent = "Before you read...";
      
      const description = document.createElement('p');
      description.textContent = "What does the title refer to?";
      
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Your answer';
      input.className = 'auth-input';
      
      const button = document.createElement('button');
      button.textContent = 'Continue';
      button.className = 'auth-button';
      
      const errorMsg = document.createElement('p');
      errorMsg.className = 'auth-error';
      errorMsg.style.display = 'none';
      errorMsg.textContent = "Nope... It's a substance.";
      
      // Add elements to modal
      modal.appendChild(title);
      modal.appendChild(description);
      modal.appendChild(input);
      modal.appendChild(button);
      modal.appendChild(errorMsg);
      overlay.appendChild(modal);
      
      // Add modal to document
      document.body.appendChild(overlay);
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .auth-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .auth-modal {
          background-color: #181818;
          border: 2px solid var(--primary);
          padding: 2rem;
          border-radius: 6px;
          max-width: 90%;
          width: 400px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .auth-modal h2 {
          color: var(--primary);
          margin-top: 0;
        }
        
        .auth-input {
          width: 100%;
          padding: 0.75rem;
          margin: 1.5rem 0;
          border: 1px solid #444;
          background-color: #222;
          color: #eee;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .auth-button {
          background-color: var(--primary);
          color: #181818;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
        }
        
        .auth-button:hover {
          background-color: var(--primary-dark);
        }
        
        .auth-error {
          color: #e74c3c;
          margin-top: 1rem;
          font-weight: bold;
        }
        
        .welcome-message {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: var(--primary);
          color: #181818;
          padding: 1rem;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          z-index: 100;
          font-weight: bold;
          max-width: 300px;
          animation: fadeOut 0.5s 6.5s forwards;
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; visibility: hidden; }
        }
      `;
      document.head.appendChild(style);
      
      // Focus the input
      input.focus();
      
      // Check authentication on button click
      button.addEventListener('click', function() {
        checkAuth(input.value);
      });
      
      // Allow Enter key to submit
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          checkAuth(input.value);
        }
      });
      
      // Authentication check function
      function checkAuth(answer) {
        // Simple case-insensitive check
        const normalizedAnswer = answer.trim().toLowerCase();
        
        // Check if answer is correct
        const correct = correctAnswers.some(
          correctAnswer => correctAnswer.toLowerCase() === normalizedAnswer
        );
        
        if (correct) {
          // Handle successful authentication
          setAuthenticated(true);
          document.body.removeChild(overlay);
          
          // Show welcome message
          const message = document.createElement('div');
          message.className = 'welcome-message';
          message.textContent = welcomeMessages.default;
          
          document.body.appendChild(message);
          setTimeout(() => {
            if (message.parentNode === document.body) {
              document.body.removeChild(message);
            }
          }, 6500);
          
        } else {
          // Show error message
          errorMsg.style.display = 'block';
          input.value = '';
          
          // Shake animation for the modal
          modal.style.animation = 'shake 0.5s';
          setTimeout(() => {
            modal.style.animation = '';
          }, 500);
        }
      }
      
      // Add shake animation
      const shakeStyle = document.createElement('style');
      shakeStyle.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `;
      document.head.appendChild(shakeStyle);
    }
    
    // Console log for debugging
    console.log("Title auth script loaded v1.1");
    
    // Main function that runs on page load
    function init() {
      // Only proceed if we're on the restricted post
      if (!isRestrictedPost()) {
        return;
      }
      
      // If not authenticated, show the modal
      if (!isAuthenticated()) {
        // Hide content initially
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.style.visibility = 'hidden';
          
          // Show authentication modal
          showAuthModal();
          
          // Set an interval to check authentication status
          const checkInterval = setInterval(() => {
            if (isAuthenticated()) {
              mainContent.style.visibility = 'visible';
              clearInterval(checkInterval);
            }
          }, 500);
        }
      }
    }
    
    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
})();