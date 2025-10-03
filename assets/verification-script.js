// Final verification script
// This script will check if the main issues have been resolved

(function() {
  // Function to check if the transparency issues are fixed
  function checkTransparencyFixes() {
    // Check if the CSS fixes are in place
    const cssLink = document.querySelector('link[href="/assets/custom-fixes.css"]');
    if (!cssLink) {
      console.warn('Custom fixes CSS not loaded');
      return false;
    }
    
    // Check if the blue gradient buttons have proper background
    const blueButtons = document.querySelectorAll('.bg-gradient-to-r.from-blue-500.to-blue-600');
    if (blueButtons.length > 0) {
      // Check computed styles
      const button = blueButtons[0];
      const computedStyle = window.getComputedStyle(button);
      if (computedStyle.background.includes('linear-gradient') && !computedStyle.background.includes('transparent')) {
        console.log('✓ Blue gradient buttons fixed');
      } else {
        console.warn('✗ Blue gradient buttons still have transparency issues');
      }
    }
    
    // Check if the purple to pink buttons have proper background
    const purplePinkButtons = document.querySelectorAll('.bg-gradient-to-r.from-purple-500.to-pink-500');
    if (purplePinkButtons.length > 0) {
      const button = purplePinkButtons[0];
      const computedStyle = window.getComputedStyle(button);
      if (computedStyle.background.includes('linear-gradient') && !computedStyle.background.includes('transparent')) {
        console.log('✓ Purple to pink gradient buttons fixed');
      } else {
        console.warn('✗ Purple to pink gradient buttons still have transparency issues');
      }
    }
    
    // Check if the amber to orange buttons have proper background
    const amberOrangeButtons = document.querySelectorAll('.bg-gradient-to-r.from-amber-500.to-orange-500');
    if (amberOrangeButtons.length > 0) {
      const button = amberOrangeButtons[0];
      const computedStyle = window.getComputedStyle(button);
      if (computedStyle.background.includes('linear-gradient') && !computedStyle.background.includes('transparent')) {
        console.log('✓ Amber to orange gradient buttons fixed');
      } else {
        console.warn('✗ Amber to orange gradient buttons still have transparency issues');
      }
    }
    
    // Check if the rose to red buttons have proper background
    const roseRedButtons = document.querySelectorAll('.bg-gradient-to-r.from-rose-500.to-red-500');
    if (roseRedButtons.length > 0) {
      const button = roseRedButtons[0];
      const computedStyle = window.getComputedStyle(button);
      if (computedStyle.background.includes('linear-gradient') && !computedStyle.background.includes('transparent')) {
        console.log('✓ Rose to red gradient buttons fixed');
      } else {
        console.warn('✗ Rose to red gradient buttons still have transparency issues');
      }
    }
    
    return true;
  }
  
  // Function to check if matches are loading
  function checkMatchesLoading() {
    // Check if we're on the matches page
    if (window.location.pathname !== '/matches') {
      console.log('Not on matches page, skipping matches check');
      return true;
    }
    
    // Check if "No matches found" message is visible
    const noMatchesElements = document.querySelectorAll('.beautiful-empty-state, .dashboard-empty-state, .empty-state');
    let noMatchesVisible = false;
    
    noMatchesElements.forEach(element => {
      if (element.textContent && element.textContent.includes('No matches found')) {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.display !== 'none') {
          noMatchesVisible = true;
        }
      }
    });
    
    if (noMatchesVisible) {
      console.warn('✗ "No matches found" message is still visible');
      return false;
    } else {
      console.log('✓ "No matches found" message is hidden');
    }
    
    // Check if match cards are visible
    const matchCards = document.querySelectorAll('.beautiful-card, .card, .match-card, .bet-card');
    if (matchCards.length > 0) {
      console.log('✓ Match cards are visible');
      return true;
    } else {
      console.warn('✗ No match cards found');
      return false;
    }
  }
  
  // Run verification when page loads
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      console.log('=== TK999 Betting Platform - Verification Report ===');
      checkTransparencyFixes();
      checkMatchesLoading();
      console.log('=== End of Verification Report ===');
    }, 3000); // Wait for React to render
  });
  
  // Also run on navigation changes
  window.addEventListener('popstate', function() {
    setTimeout(() => {
      console.log('=== TK999 Betting Platform - Navigation Verification Report ===');
      checkTransparencyFixes();
      checkMatchesLoading();
      console.log('=== End of Verification Report ===');
    }, 1000);
  });
})();