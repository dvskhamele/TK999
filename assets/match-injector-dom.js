// Direct DOM manipulation script to show matches
// This script will directly inject match data into the page when it loads

(function() {
  // Mock match data
  const mockMatches = [
    {
      id: 1,
      sport: 'Football',
      league: 'Premier League',
      teamA: 'Manchester United',
      teamB: 'Liverpool',
      teamAScore: 1,
      teamBScore: 1,
      status: 'live',
      startTime: new Date(Date.now() - 3600000), // 1 hour ago
      odds: {
        teamA: 2.2,
        draw: 3.0,
        teamB: 2.8
      },
      isLive: true,
      isFavorite: true,
      category: 'Football',
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      sport: 'Cricket',
      league: 'T20 World Cup',
      teamA: 'India',
      teamB: 'Australia',
      teamAScore: 145,
      teamBScore: 89,
      status: 'live',
      startTime: new Date(Date.now() - 7200000), // 2 hours ago
      odds: {
        teamA: 1.8,
        teamB: 2.1
      },
      isLive: true,
      isFavorite: true,
      category: 'Cricket',
      date: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 3,
      sport: 'Tennis',
      league: 'Wimbledon',
      teamA: 'Djokovic',
      teamB: 'Nadal',
      teamAScore: 2,
      teamBScore: 1,
      status: 'live',
      startTime: new Date(Date.now() - 3600000), // 1 hour ago
      odds: {
        teamA: 1.7,
        teamB: 2.2
      },
      isLive: true,
      isFavorite: false,
      category: 'Tennis',
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 4,
      sport: 'Football',
      league: 'La Liga',
      teamA: 'Barcelona',
      teamB: 'Real Madrid',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 3600000), // 1 hour from now
      odds: {
        teamA: 2.3,
        draw: 3.1,
        teamB: 3.0
      },
      isLive: false,
      isFavorite: true,
      category: 'Football',
      date: new Date(Date.now() + 3600000).toISOString()
    },
    {
      id: 5,
      sport: 'Basketball',
      league: 'NBA',
      teamA: 'Lakers',
      teamB: 'Warriors',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 7200000), // 2 hours from now
      odds: {
        teamA: 1.9,
        teamB: 1.95
      },
      isLive: false,
      isFavorite: false,
      category: 'Basketball',
      date: new Date(Date.now() + 7200000).toISOString()
    }
  ];

  // Function to create match HTML
  function createMatchHTML(match) {
    // Emoji mapping for sports
    const sportEmojis = {
      'Football': '⚽',
      'Cricket': '🏏',
      'Basketball': '🏀',
      'Tennis': '🎾'
    };
    
    const emoji = sportEmojis[match.category] || '🏆';
    
    // Format date and time
    const matchDate = new Date(match.date);
    const formattedDate = matchDate.toLocaleDateString();
    const formattedTime = matchDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Status badge
    let statusBadge = '';
    if (match.status === 'live') {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 animate-pulse">🔴 LIVE</span>';
    } else if (match.status === 'upcoming') {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">⏰ UPCOMING</span>';
    } else {
      statusBadge = '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">✅ FINISHED</span>';
    }
    
    // Create odds HTML
    let oddsHTML = '';
    for (const [outcome, odd] of Object.entries(match.odds)) {
      oddsHTML += `
        <div class="border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-gray-200">
          <h4 class="font-bold mb-2 text-gray-800">${outcome}</h4>
          <div class="text-2xl font-bold text-purple-600 mb-3">${odd.toFixed(2)}</div>
          <div class="flex gap-1 justify-center mb-3">
            ${[100, 250, 500].map(amount => `
              <button onclick="alert('Placing bet of ${amount} BDT on ${outcome} at odds ${odd.toFixed(2)}')" 
                class="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 px-3 py-1 rounded-lg text-sm font-bold transition-all duration-300 shadow-sm">
                ${amount}
              </button>
            `).join('')}
          </div>
          <button onclick="alert('Placing bet on ${outcome} at odds ${odd.toFixed(2)}')" 
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm">
            Bet Now
          </button>
        </div>
      `;
    }
    
    return `
      <div class="bg-white rounded-2xl shadow-xl mb-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div class="p-5">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
            <div class="flex items-center">
              <span class="text-2xl mr-3">${emoji}</span>
              <div>
                <h3 class="text-xl font-bold text-gray-800">${match.teamA} vs ${match.teamB}</h3>
                <p class="text-gray-600">${match.category} • ${match.league}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              ${statusBadge}
              <span class="text-gray-600 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${formattedDate}
              </span>
            </div>
          </div>
          
          ${match.status === 'live' ? `
            <div class="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-5 text-center">
              <div class="text-3xl font-bold text-red-600">
                ${match.teamAScore} - ${match.teamBScore}
              </div>
              <p class="text-red-700 font-semibold mt-1">LIVE SCORE</p>
            </div>
          ` : ''}
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            ${oddsHTML}
          </div>
          
          <div class="border rounded-xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <h4 class="font-bold mb-3 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-purple-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
              Match Info
            </h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Date:</span>
                <span class="font-medium">${formattedDate}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Time:</span>
                <span class="font-medium">${formattedTime}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sport:</span>
                <span class="font-medium">${match.category}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Status:</span>
                <span class="font-medium capitalize">${match.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Function to inject matches into the page
  function injectMatches() {
    // Check if we're on the matches page
    if (window.location.pathname !== '/matches') {
      return;
    }

    // Wait for the page to load
    setTimeout(() => {
      // Try to find the "No Matches Found" message
      const noMatchesElements = document.querySelectorAll('h3, p, div');
      let noMatchesFound = false;
      let noMatchesElement = null;
      
      // Look for the specific "No Matches Found" message
      for (let el of noMatchesElements) {
        if (el.textContent && el.textContent.includes('No Matches Found')) {
          noMatchesFound = true;
          noMatchesElement = el;
          break;
        }
      }
      
      // If we found "No Matches Found", hide it and inject our matches
      if (noMatchesFound && noMatchesElement) {
        // Hide the "No Matches Found" message
        noMatchesElement.style.display = 'none';
        if (noMatchesElement.parentElement) {
          noMatchesElement.parentElement.style.display = 'none';
        }
        
        // Create a container for our matches
        const container = document.createElement('div');
        container.id = 'injected-matches';
        container.className = 'injected-matches-container';
        container.style.cssText = `
          margin-top: 20px;
        `;
        
        // Add a title
        const title = document.createElement('h2');
        title.className = 'text-2xl font-bold text-gray-800 mb-6 flex items-center';
        title.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-purple-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>Available Matches';
        container.appendChild(title);
        
        // Add our mock matches to the container
        mockMatches.forEach(match => {
          const matchHTML = createMatchHTML(match);
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = matchHTML;
          container.appendChild(tempDiv.firstChild);
        });
        
        // Try to find a good place to insert our matches
        // Look for the main content area
        const mainContent = document.querySelector('main') || 
                           document.querySelector('.container') || 
                           document.querySelector('#root') ||
                           document.body;
        
        if (mainContent) {
          // Insert after the "No Matches Found" section or at the end of main content
          mainContent.appendChild(container);
        }
      }
    }, 2000); // Wait 2 seconds for React to render
  }

  // Run the injection when the page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectMatches);
  } else {
    injectMatches();
  }

  // Also run on navigation changes
  window.addEventListener('popstate', injectMatches);
  
  // Run periodically to ensure matches stay visible
  setInterval(injectMatches, 5000);
})();