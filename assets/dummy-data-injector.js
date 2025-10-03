// Dummy data injector script
// This script directly injects match data into the page to make it playable

(function() {
  // Wait for the page to load
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the matches page
    if (window.location.pathname === '/matches') {
      // Wait a bit for React to render
      setTimeout(injectDummyMatches, 2000);
    }
  });

  function injectDummyMatches() {
    // Create dummy match data
    const dummyMatches = [
      {
        id: 1,
        sport: 'Football',
        category: 'Premier League',
        teamA: 'Manchester United',
        teamB: 'Liverpool',
        teamAScore: 1,
        teamBScore: 1,
        status: 'live',
        date: new Date().toISOString(),
        odds: {
          teamA: 2.2,
          draw: 3.0,
          teamB: 2.8
        },
        isLive: true,
        isFavorite: true
      },
      {
        id: 2,
        sport: 'Cricket',
        category: 'T20 World Cup',
        teamA: 'India',
        teamB: 'Australia',
        teamAScore: 145,
        teamBScore: 89,
        status: 'live',
        date: new Date().toISOString(),
        odds: {
          teamA: 1.8,
          teamB: 2.1
        },
        isLive: true,
        isFavorite: true
      },
      {
        id: 3,
        sport: 'Football',
        category: 'La Liga',
        teamA: 'Barcelona',
        teamB: 'Real Madrid',
        teamAScore: null,
        teamBScore: null,
        status: 'upcoming',
        date: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        odds: {
          teamA: 2.3,
          draw: 3.1,
          teamB: 3.0
        },
        isLive: false,
        isFavorite: true
      },
      {
        id: 4,
        sport: 'Basketball',
        category: 'NBA',
        teamA: 'Lakers',
        teamB: 'Warriors',
        teamAScore: null,
        teamBScore: null,
        status: 'upcoming',
        date: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
        odds: {
          teamA: 1.9,
          teamB: 1.95
        },
        isLive: false,
        isFavorite: false
      },
      {
        id: 5,
        sport: 'Tennis',
        category: 'Wimbledon',
        teamA: 'Djokovic',
        teamB: 'Nadal',
        teamAScore: null,
        teamBScore: null,
        status: 'upcoming',
        date: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
        odds: {
          teamA: 1.7,
          teamB: 2.2
        },
        isLive: false,
        isFavorite: false
      }
    ];

    // Try to find the matches container and inject our dummy data
    const rootElement = document.getElementById('root');
    if (rootElement) {
      // Look for the matches section
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          // Check if any new nodes were added
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              // Look for elements that might contain match data
              const matchElements = node.querySelectorAll('[class*="match"], [class*="bet"], [class*="card"]');
              if (matchElements.length > 0) {
                // Try to inject our dummy data
                injectMatchDataIntoDOM(dummyMatches);
              }
            }
          });
        });
      });

      // Start observing
      observer.observe(rootElement, {
        childList: true,
        subtree: true
      });

      // Also try to inject immediately
      setTimeout(() => {
        injectMatchDataIntoDOM(dummyMatches);
      }, 1000);
    }
  }

  function injectMatchDataIntoDOM(matches) {
    // Try to find containers where we can inject the match data
    const containers = document.querySelectorAll('main.container, .beautiful-card-body, .dashboard-card-body, .card-body');
    
    // If we found containers, inject our dummy data
    if (containers.length > 0) {
      // Take the first container that seems appropriate
      const container = Array.from(containers).find(c => 
        c.textContent.includes('Matches') || 
        c.textContent.includes('Bets') || 
        c.textContent.includes('Play') ||
        c.classList.contains('beautiful-card-body') ||
        c.classList.contains('dashboard-card-body')
      ) || containers[0];
      
      // Create HTML for our dummy matches
      const matchesHTML = `
        <div class="dummy-matches-injected bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div class="mb-8 fade-in-up">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 text-3xl text-purple-700"><path d="M10 20a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
              <span class="text-gray-900">Play Today</span>
            </h2>
            <p class="text-gray-800 mt-2 text-lg">Choose your matches and place your bets</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${matches.map(createMatchCardHTML).join('')}
          </div>
        </div>
      `;
      
      // Inject the HTML into the container
      container.innerHTML = matchesHTML + container.innerHTML;
      
      // Add event listeners for the bet buttons
      document.querySelectorAll('.dummy-bet-button').forEach(button => {
        button.addEventListener('click', function() {
          const matchId = this.dataset.matchId;
          const team = this.dataset.team;
          const amount = prompt(`Enter amount to bet on ${team}:`, '100');
          
          if (amount && !isNaN(parseInt(amount)) && parseInt(amount) > 0) {
            alert(`Bet placed successfully on ${team} for ${amount} BDT!`);
            // In a real implementation, this would call the API to place the bet
          } else if (amount) {
            alert('Please enter a valid amount');
          }
        });
      });
    }
  }

  function createMatchCardHTML(match) {
    const sportEmoji = getSportEmoji(match.sport);
    
    return `
      <div class="beautiful-card bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center">
              <span class="text-3xl mr-4">${sportEmoji}</span>
              <div>
                <h3 class="text-xl font-bold text-gray-800">${match.teamA} vs ${match.teamB}</h3>
                <p class="text-gray-600">${match.category}</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full text-sm font-semibold border ${
              match.status === 'live' ? 
                'bg-red-100 text-red-800 border-red-200 animate-pulse' : 
                match.status === 'upcoming' ? 
                  'bg-blue-100 text-blue-800 border-blue-200' : 
                  'bg-gray-100 text-gray-800 border-gray-200'
            }">
              ${match.status === 'live' ? '🔴 LIVE' : match.status === 'upcoming' ? '⏰ UPCOMING' : '✅ FINISHED'}
            </span>
          </div>
          
          ${match.status === 'live' ? `
            <div class="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 mb-6 text-center">
              <div class="text-3xl font-bold text-red-600">${match.teamAScore} - ${match.teamBScore}</div>
              <p class="text-red-700 font-semibold mt-1">LIVE SCORE</p>
            </div>
          ` : ''}
          
          <div class="grid grid-cols-3 gap-4">
            <div class="border rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-gray-200">
              <h4 class="font-bold mb-2 text-gray-800">${match.teamA}</h4>
              <div class="text-2xl font-bold text-purple-600 mb-3">${match.odds.teamA.toFixed(2)}</div>
              <button 
                class="dummy-bet-button bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
                data-match-id="${match.id}"
                data-team="${match.teamA}"
              >
                Bet Now
              </button>
            </div>
            
            ${match.odds.draw ? `
              <div class="border rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-gray-200">
                <h4 class="font-bold mb-2 text-gray-800">Draw</h4>
                <div class="text-2xl font-bold text-purple-600 mb-3">${match.odds.draw.toFixed(2)}</div>
                <button 
                  class="dummy-bet-button bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
                  data-match-id="${match.id}"
                  data-team="Draw"
                >
                  Bet Now
                </button>
              </div>
            ` : ''}
            
            <div class="border rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-gray-200">
              <h4 class="font-bold mb-2 text-gray-800">${match.teamB}</h4>
              <div class="text-2xl font-bold text-purple-600 mb-3">${match.odds.teamB.toFixed(2)}</div>
              <button 
                class="dummy-bet-button bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
                data-match-id="${match.id}"
                data-team="${match.teamB}"
              >
                Bet Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function getSportEmoji(sport) {
    const emojis = {
      'Football': '⚽',
      'Cricket': '🏏',
      'Basketball': '🏀',
      'Tennis': '🎾',
      'Hockey': '🏒',
      'Baseball': '⚾',
      'Volleyball': '🏐',
      'Rugby': '🏉'
    };
    return emojis[sport] || '🏆';
  }
})();