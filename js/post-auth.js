// Updated post-auth.js with fixes for deployment issues
(function() {
    // Configuration - Add the approved names here (UPDATED LIST)
    const approvedNames = [
      "Nancy", 
      "Me",
      "Nancy Zhang",
      "Bhakti",
      "Bhakti Parwani", 
      "Chase",
      "Ella Chase",
      "Jiayi",
      "Jiayi Zhang",
      "Chahana",
      "Cha",
      "Chahana Budhbhatti",
      "Lika",
      "Lika Bolkvadze",
      "Rebecca",
      "Becca",
      "Becky",
      "Rebecca Suarez",
      "Sanju",
      "Sanjana",
      "Sanjana Kumar",
      "Mandy",
      "Mandy Reyes",
      "Phoebe",
      "Phoebe Tamaoki",
      "Cecilia",
      "Cecilia Denis",
      "CD",
      "Summer",
      "Summer Quinn",
      "Anastasia",
      "Anastasia Sia",
      "Stassi",
      "Sabrina",
      "Sabrina Loui",
      "Sabs",
      "Sabby",
      "Ella",
      "Ella Subramanian",
      "Nikki",
      "Nikita Sulkar",
      "Nikita",
      "Ally",
      "Ally Bernstein",
      "Sarita",
      "Sarita Biswas",
      "Sophie",
      "Sophie Xu",
      "Sooofy",
      "Kelsey",
      "Kels",
      "Jenny",
      "Angela",
      "Christine"
    ];
    
    // Messages for different people - using name mapping to handle variations
    const customMessages = {
      "Nancy": "The Joker is back! Welcome.",
      "Bhakti": "Here is all the tea to spill Bwok Bwok. Let's keep it between us. ;)",
      "Chase": "Chaser! Cheers to our e-tea session! Secret posts between us. ;)",
      "Rebecca": "Becca Suarez... Big tea session. Please keep it between us girls. ;)",
      "Mandy": "Mands you are here! Hope you are having fun in Spain! Let's keep this tea between us Mands. ;)",
      "Chahana": "Cha! Continuing our Sherman ranting... Let's keep this rom com between us. XOXO.",
      "Lika": "Hmmmm Lika! Delicious. Secret post. Iykyk. ;)",
      "Sanju": "Sanjana Kumar. Love to see you here. I still remember you telling me Watty was such a better guy compared to Ken. That was really wise. I am glad I listened. But...still friends. Friends last forever.",
      "Jiayi": "我的姐啊，救救你的妹。",
      "Phoebe": "Bunny bean, here is a rom com in action. Everything that I need to tell you & forgot to tell you. I miss you!!",
      "Cecilia": "Thx again for the shoes CD. Here is the tea... between us...",
      "Summer": "Appreciate the shoes Summer. I hope this post gives you a little laugh.",
      "Anastasia": "Miss you Stassi. Enjoy the secret tea... and keep it a secret...",
      "Sabrina": "Wassup Hawaiiam hottie. Here is a little secret entertainment for you... Secret...",
      "Ella": "Miss you Ellu! Visit Deis soon! But before that... here is the tea...",
      "Nikki": "Thanks for the unforgettable Boston experience Nikki! Hope this post can entertain you for a bit!",
      "Ally": "Welcome Ally! Hope all is well! Hope the archillies is stronger than ever!",
      "Sarita": "Heyyy Sarita! Miss you a lot. Hope to see you at Deis soon. :)",
      "Sophie": "Sophie!! Princess!! 好想你! Our tea sessions are the best. :)",
      "Kelsey": "Kels! Hope you enjoy the tea, and have fun in Michigan. :D",
      "Jenny": "珍妮姐好久没见啦! 希望一切都好嗷。",
      "Angela": "Hope you enjoy the tea Angela. Please say hi to niuniu for me! :D ",
      "Christine": "Heyyyy Korean princess! Hope all is well in NY. Stay in touch!",
      "default": "Welcome to this sh*t show (no)!"
    };
    
    // Map to determine which message to show for each name - UPDATED
    const nameToMessageMap = {
      "nancy": "Nancy",
      "nancy zhang": "Nancy",
      "me": "Nancy",
      "bhakti": "Bhakti",
      "bhakti parwani": "Bhakti",
      "chase": "Chase",
      "ella chase": "Chase",
      "jiayi": "Jiayi",
      "jiayi zhang": "Jiayi",
      "chahana": "Chahana",
      "chahana budhbhatti": "Chahana",
      "cha": "Chahana",
      "lika": "Lika",
      "lika bolkvadze": "Lika",
      "rebecca": "Rebecca",
      "becca": "Rebecca",
      "rebecca suarez": "Rebecca",
      "becky": "Rebecca",
      "phoebe": "Phoebe",
      "phoebe tamaoki": "Phoebe",
      "sanju": "Sanju",
      "sanjana": "Sanju",
      "sanjana kumar": "Sanju",
      "mandy": "Mandy",
      "mandy reyes": "Mandy",
      "cecilia": "Cecilia",
      "cecilia denis": "Cecilia",
      "cd": "Cecilia",
      "summer": "Summer",
      "summer quinn": "Summer",
      "anastasia": "Anastasia",
      "anastasia sia": "Anastasia",
      "stassi": "Anastasia",
      "sabrina": "Sabrina",
      "sabs": "Sabrina",
      "sabrina loui": "Sabrina",
      "sabby": "Sabrina",
      "ella": "Ella",
      "ella subramanian": "Ella",
      "nikki": "Nikki",
      "nikita sulkar": "Nikki",
      "nikita": "Nikki",
      "ally": "Ally",
      "ally bernstein": "Ally",
      "sarita": "Sarita",
      "sarita biswas": "Sarita",
      "sophie": "Sophie",
      "sophie xu": "Sophie",
      "sooofy": "Sophie",
      "kelsey": "Kelsey",
      "kels": "Kelsey",
      "jenny": "Jenny",
      "angela": "Angela",
      "christine": "Christine"
    };
    
    // The ID of the blog post that requires authentication
    const restrictedPostId = "clubbingpackagept1";
    
    // Check if we're on the restricted post
    function isRestrictedPost() {
      // Use a more robust check that handles URL variations
      const currentPath = window.location.pathname.toLowerCase();
      return currentPath.includes(restrictedPostId) || 
             currentPath.includes("/posts/" + restrictedPostId) ||
             currentPath.includes("/posts/" + restrictedPostId + "/");
    }
    
    // Check if user has already been authenticated
    function isAuthenticated() {
      return sessionStorage.getItem('clubbing_auth') === 'true';
    }
    
    // Set the authentication status with version number to handle updates
    function setAuthenticated(status) {
      sessionStorage.setItem('clubbing_auth', status);
      sessionStorage.setItem('auth_version', '2'); // Increment when you update names
    }
    
    // Create and show the modal
    function showAuthModal() {
      // Clear any existing modal first (in case of duplicates)
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
      description.textContent = "This post contains juicy details from a private night out for GIRLS ONLY. Please enter your name to continue:";
      
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Your name';
      input.className = 'auth-input';
      
      const button = document.createElement('button');
      button.textContent = 'Continue';
      button.className = 'auth-button';
      
      const errorMsg = document.createElement('p');
      errorMsg.className = 'auth-error';
      errorMsg.style.display = 'none';
      errorMsg.textContent = "Sorry, you don't have access to this post.";
      
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

      // Try to retrieve names from localStorage as a fallback if there are issues
      function getLocalApprovedNames() {
        try {
          let localNames = localStorage.getItem('approved_names');
          if (localNames) {
            return JSON.parse(localNames);
          }
        } catch (e) {
          console.error("Error reading from localStorage:", e);
        }
        return null;
      }

      // Store approved names for fallback
      try {
        localStorage.setItem('approved_names', JSON.stringify(approvedNames));
      } catch (e) {
        console.error("Error writing to localStorage:", e);
      }
      
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
      function checkAuth(name) {
        // Simple case-insensitive check
        const normalizedName = name.trim();
        
        // Try different approval mechanisms to be more resilient
        let fallbackNames = getLocalApprovedNames() || [];
        
        // Check if name is in approved list (case-insensitive)
        const approved = approvedNames.some(
          approved => approved.toLowerCase() === normalizedName.toLowerCase()
        ) || fallbackNames.some(
          approved => approved.toLowerCase() === normalizedName.toLowerCase()
        );
        
        if (approved) {
          // Handle successful authentication
          setAuthenticated(true);
          document.body.removeChild(overlay);
          
          // Show welcome message
          const message = document.createElement('div');
          message.className = 'welcome-message';
          
          // Get message key from the mapping
          const normalizedNameLower = normalizedName.toLowerCase();
          const messageKey = nameToMessageMap[normalizedNameLower] || "default";
          message.textContent = customMessages[messageKey] || customMessages.default;
          
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
    
    // Main function that runs on page load
    function init() {
      // Clear authentication if version doesn't match
      if (sessionStorage.getItem('auth_version') !== '2') {
        sessionStorage.removeItem('clubbing_auth');
      }
      
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
    
    // Expose a reset function for debugging
    window.resetClubAuth = function() {
      sessionStorage.removeItem('clubbing_auth');
      sessionStorage.removeItem('auth_version');
      console.log("Authentication reset. Reload the page to see the auth modal.");
    };
})();