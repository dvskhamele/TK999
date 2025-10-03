// Simple match data injector
// This script directly populates the matches page with mock data

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
      startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
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
      startTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
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
      startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
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
      startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
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
      startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
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

  // Function to inject match data into the page
  function injectMatchData() {
    // Check if we're on the matches page
    if (window.location.pathname !== '/matches') {
      return;
    }

    // Wait for React to render
    setTimeout(() => {
      // Try to find the matches container
      const matchesContainer = document.querySelector('.matches-container') || 
                             document.querySelector('.dashboard-matches') ||
                             document.querySelector('.match-list') ||
                             document.querySelector('main');

      if (matchesContainer) {
        // Look for the "No matches found" message
        const noMatchesElement = matchesContainer.querySelector('.beautiful-empty-state') ||
                                matchesContainer.querySelector('.dashboard-empty-state') ||
                                matchesContainer.querySelector('.empty-state') ||
                                Array.from(matchesContainer.querySelectorAll('*')).find(el => 
                                  el.textContent && el.textContent.includes('No matches found')
                                );

        if (noMatchesElement) {
          // Hide the "No matches found" message
          noMatchesElement.style.display = 'none';

          // Create a simple match display
          const matchDisplay = document.createElement('div');
          matchDisplay.className = 'injected-matches';
          matchDisplay.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
          `;

          // Add matches to the display
          mockMatches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.className = 'beautiful-card';
            matchCard.style.cssText = `
              background: white;
              border-radius: 16px;
              padding: 20px;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
              border: 1px solid #e2e8f0;
              transition: all 0.3s ease;
            `;

            matchCard.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div>
                  <h3 style="font-size: 18px; font-weight: bold; color: #1e293b;">${match.teamA} vs ${match.teamB}</h3>
                  <p style="color: #64748b; font-size: 14px;">${match.league} • ${match.category}</p>
                </div>
                <span style="background: ${match.status === 'live' ? '#ef4444' : '#3b82f6'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                  ${match.status === 'live' ? '🔴 LIVE' : '⏰ UPCOMING'}
                </span>
              </div>
              
              ${match.status === 'live' ? `
                <div style="background: #fee2e2; border-radius: 12px; padding: 15px; margin-bottom: 15px; text-align: center;">
                  <div style="font-size: 24px; font-weight: bold; color: #dc2626;">
                    ${match.teamAScore} - ${match.teamBScore}
                  </div>
                  <p style="color: #dc2626; font-weight: bold; margin-top: 5px;">LIVE SCORE</p>
                </div>
              ` : ''}
              
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                <div style="text-align: center; background: #f1f5f9; padding: 10px; border-radius: 12px;">
                  <div style="font-size: 18px; font-weight: bold; color: #4f46e5;">${match.odds.teamA.toFixed(2)}</div>
                  <div style="font-size: 14px; color: #64748b;">${match.teamA}</div>
                </div>
                <div style="text-align: center; background: #f1f5f9; padding: 10px; border-radius: 12px;">
                  <div style="font-size: 18px; font-weight: bold; color: #4f46e5;">${match.odds.draw ? match.odds.draw.toFixed(2) : '-'}</div>
                  <div style="font-size: 14px; color: #64748b;">Draw</div>
                </div>
                <div style="text-align: center; background: #f1f5f9; padding: 10px; border-radius: 12px;">
                  <div style="font-size: 18px; font-weight: bold; color: #4f46e5;">${match.odds.teamB.toFixed(2)}</div>
                  <div style="font-size: 14px; color: #64748b;">${match.teamB}</div>
                </div>
              </div>
              
              <button onclick="alert('Bet placed on ${match.teamA}!')" 
                style="width: 100%; background: linear-gradient(135deg, #8b5cf6, #ec4899); 
                       color: white; border: none; padding: 12px; border-radius: 12px; 
                       font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                Place Bet
              </button>
            `;

            matchDisplay.appendChild(matchCard);
          });

          // Insert the match display after the "No matches found" element
          if (noMatchesElement.parentNode) {
            noMatchesElement.parentNode.insertBefore(matchDisplay, noMatchesElement.nextSibling);
          } else {
            matchesContainer.appendChild(matchDisplay);
          }
        }
      }
    }, 2000); // Wait 2 seconds for React to render
  }

  // Run the injection when the page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectMatchData);
  } else {
    injectMatchData();
  }

  // Also run on navigation changes
  window.addEventListener('popstate', injectMatchData);
})();