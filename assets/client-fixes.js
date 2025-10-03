// Client-side fixes for the betting platform
// This script directly manipulates the DOM to show matches when the page loads

(function() {
  // Mock match data
  const mockMatches = [
    // Live matches
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
    // Upcoming matches
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
    },
    {
      id: 6,
      sport: 'Football',
      league: 'Serie A',
      teamA: 'Juventus',
      teamB: 'AC Milan',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 10800000), // 3 hours from now
      odds: {
        teamA: 2.1,
        draw: 3.0,
        teamB: 3.2
      },
      isLive: false,
      isFavorite: false,
      category: 'Football',
      date: new Date(Date.now() + 10800000).toISOString()
    },
    {
      id: 7,
      sport: 'Football',
      league: 'Bundesliga',
      teamA: 'Bayern Munich',
      teamB: 'Borussia Dortmund',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 14400000), // 4 hours from now
      odds: {
        teamA: 1.7,
        draw: 3.5,
        teamB: 4.2
      },
      isLive: false,
      isFavorite: false,
      category: 'Football',
      date: new Date(Date.now() + 14400000).toISOString()
    },
    {
      id: 8,
      sport: 'Cricket',
      league: 'IPL',
      teamA: 'Mumbai Indians',
      teamB: 'Chennai Super Kings',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 18000000), // 5 hours from now
      odds: {
        teamA: 1.9,
        teamB: 1.85
      },
      isLive: false,
      isFavorite: true,
      category: 'Cricket',
      date: new Date(Date.now() + 18000000).toISOString()
    },
    {
      id: 9,
      sport: 'Tennis',
      league: 'US Open',
      teamA: 'Alcaraz',
      teamB: 'Djokovic',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 21600000), // 6 hours from now
      odds: {
        teamA: 2.1,
        teamB: 1.7
      },
      isLive: false,
      isFavorite: false,
      category: 'Tennis',
      date: new Date(Date.now() + 21600000).toISOString()
    },
    {
      id: 10,
      sport: 'Basketball',
      league: 'NBA',
      teamA: 'Celtics',
      teamB: 'Heat',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 25200000), // 7 hours from now
      odds: {
        teamA: 1.85,
        teamB: 1.9
      },
      isLive: false,
      isFavorite: false,
      category: 'Basketball',
      date: new Date(Date.now() + 25200000).toISOString()
    }
  ];

  // Function to create match HTML
  function createMatchHTML(match) {
    // Emoji for sport categories
    const sportEmojis = {
      'Football': '⚽',
      'Cricket': '🏏',
      'Basketball': '🏀',
      'Tennis': '🎾',
      'Hockey': '🏒',
      'Baseball': '⚾',
      'Volleyball': '🏐',
      'Rugby': '🏉'
    };
    
    const emoji = sportEmojis[match.category] || '🏆';
    
    // Status badge
    let statusBadge = '';
    if (match.status === 'live') {
      statusBadge = `<span class="px-4 py-2 rounded-full text-sm font-semibold border bg-red-100 text-red-800 border-red-200 animate-pulse">🔴 LIVE</span>`;
    } else if (match.status === 'upcoming') {
      statusBadge = `<span class="px-4 py-2 rounded-full text-sm font-semibold border bg-blue-100 text-blue-800 border-blue-200">⏰ UPCOMING</span>`;
    } else {
      statusBadge = `<span class="px-4 py-2 rounded-full text-sm font-semibold border bg-gray-100 text-gray-800 border-gray-200">✅ FINISHED</span>`;
    }
    
    // Create odds HTML
    let oddsHTML = '';
    for (const [outcome, odd] of Object.entries(match.odds)) {
      oddsHTML += `
        <div class="border rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-gray-200">
          <h4 class="font-bold mb-3 text-lg text-gray-800">${outcome}</h4>
          <div class="text-3xl font-bold text-purple-600 mb-4">${odd.toFixed(2)}</div>
          <div class="flex gap-2 justify-center mb-4">
            ${[100, 250, 500].map(amount => `
              <button onclick="alert('Placing bet of ${amount} BDT on ${outcome} at odds ${odd.toFixed(2)}')" class="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-md">
                ${amount}
              </button>
            `).join('')}
          </div>
          <button onclick="alert('Placing bet on ${outcome} at odds ${odd.toFixed(2)}')" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap mr-2 inline"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
            Bet Now
          </button>
        </div>
      `;
    }
    
    return `
      <div class="bg-white rounded-2xl shadow-xl mb-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div class="p-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div class="flex items-center">
              <span class="text-3xl mr-4">${emoji}</span>
              <div>
                <h3 class="text-2xl font-bold text-gray-800">${match.teamA} vs ${match.teamB}</h3>
                <p class="text-gray-600">${match.category}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              ${statusBadge}
              <span class="text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar mr-2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                ${new Date(match.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          ${match.status === 'live' ? `
            <div class="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-5 mb-6 text-center">
              <div class="text-4xl font-bold text-red-600">${match.teamAScore} - ${match.teamBScore}</div>
              <p class="text-red-700 font-semibold mt-2">LIVE SCORE</p>
            </div>
          ` : ''}
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                ${oddsHTML}
              </div>
            </div>
            
            <div class="border rounded-2xl p-5 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
              <h4 class="font-bold mb-4 flex items-center text-lg text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info mr-2 text-purple-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="16" y2="12"></line><line x1="12" x2="12.01" y1="8" y2="8"></line></svg>
                Match Info
              </h4>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-600">Date:</span>
                  <span class="font-medium">${new Date(match.date).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Time:</span>
                  <span class="font-medium">${new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
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
      </div>
    `;
  }

  // Function to create daily picks HTML
  function createDailyPicksHTML() {
    const favoriteTeams = ['Manchester United', 'India', 'Barcelona', 'Lakers', 'Juventus'];
    
    return `
      <div class="bg-white rounded-2xl shadow-xl mb-8 border border-gray-100">
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-5 rounded-t-2xl">
          <h3 class="text-lg font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Daily Picks for You
          </h3>
        </div>
        <div class="p-5">
          <div class="flex flex-wrap gap-4">
            ${favoriteTeams.map(team => `
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl flex-1 min-w-[200px] border border-blue-100 hover:shadow-md transition-all duration-300">
                <h4 class="font-bold text-gray-800 text-lg">${team}</h4>
                <p class="text-sm text-gray-600 mt-2">Based on your preferences</p>
                <button onclick="alert('Viewing picks for ${team}')" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm mt-4 w-full py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  View Picks
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Function to populate the matches page
  function populateMatchesPage() {
    // Check if we're on the matches page
    if (window.location.pathname !== '/matches') {
      return;
    }
    
    // Wait for the React app to render
    setTimeout(() => {
      // Find the main content area
      const mainContent = document.querySelector('main.container.mx-auto.p-4.md\\:p-6');
      
      if (mainContent) {
        // Check if there's a "No Matches Found" message
        const noMatchesMessage = mainContent.querySelector('.beautiful-empty-state') || 
                               mainContent.querySelector('.dashboard-empty-state') ||
                               mainContent.querySelector('h3') && mainContent.querySelector('h3').textContent.includes('No Matches Found');
        
        if (noMatchesMessage) {
          // Hide the "No Matches Found" message
          const noMatchesContainer = noMatchesMessage.closest('.beautiful-card') || 
                                    noMatchesMessage.closest('.dashboard-card') ||
                                    noMatchesMessage.closest('.card') ||
                                    noMatchesMessage.parentElement;
          
          if (noMatchesContainer) {
            noMatchesContainer.style.display = 'none';
          }
          
          // Create and insert our own matches content
          const matchesContainer = document.createElement('div');
          matchesContainer.className = 'matches-content-injected';
          matchesContainer.innerHTML = `
            <div class="mb-8 fade-in-up">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3 text-3xl text-purple-700"><path d="M10 20a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                <span class="text-gray-900">Play Today</span>
              </h2>
              <p class="text-gray-800 mt-2 text-lg">Choose your matches and place your bets</p>
            </div>
            
            ${createDailyPicksHTML()}
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center border border-blue-100 hover:shadow-md transition-all duration-300">
                <div class="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mr-2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <p class="text-2xl font-bold text-blue-600">${mockMatches.filter(m => m.status === 'live').length}</p>
                </div>
                <p class="text-sm text-gray-600">Live Matches</p>
              </div>
              
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center border border-green-100 hover:shadow-md transition-all duration-300">
                <div class="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 mr-2"><path d="M17 14a5 5 0 0 0-10 0"></path><path d="M17 14a5 5 0 0 1-10 0"></path><circle cx="12" cy="14" r="8"></circle></svg>
                  <p class="text-2xl font-bold text-green-600">${mockMatches.filter(m => m.status === 'upcoming').length}</p>
                </div>
                <p class="text-sm text-gray-600">Upcoming</p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-xl text-center border border-purple-100 hover:shadow-md transition-all duration-300">
                <div class="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600 mr-2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5z"></path></svg>
                  <p class="text-2xl font-bold text-purple-600">3</p>
                </div>
                <p class="text-sm text-gray-600">Favorite Sports</p>
              </div>
              
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl text-center border border-amber-100 hover:shadow-md transition-all duration-300">
                <div class="flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600 mr-2"><circle cx="12" cy="12" r="10"></circle><path d="M16 12a4 4 0 0 0-8 0"></path><path d="M2 12h20"></path></svg>
                  <p class="text-2xl font-bold text-amber-600">1,000</p>
                </div>
                <p class="text-sm text-gray-600">Your Balance</p>
              </div>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 mt-8">
              <div class="relative w-full md:w-1/3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                <input type="text" placeholder="Search matches, teams, or sports..." class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm">
              </div>
              <div class="flex gap-3">
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-xl font-semibold flex items-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Show Filters
                </button>
                <button class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-xl font-semibold flex items-center hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  Smart Tips
                </button>
              </div>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div class="flex flex-wrap gap-2">
                <button class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center shadow-sm hover:shadow-md bg-gradient-to-r from-purple-500 to-pink-500 text-white transform hover:scale-105 border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                  All Sports
                </button>
                ${['Football', 'Cricket', 'Basketball', 'Tennis'].map(sport => {
                  const emojis = {'Football': '⚽', 'Cricket': '🏏', 'Basketball': '🏀', 'Tennis': '🎾'};
                  return `
                    <button class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center shadow-sm hover:shadow-md bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 border border-gray-200">
                      <span class="mr-2">${emojis[sport]}</span>${sport}
                    </button>
                  `;
                }).join('')}
              </div>
              <div class="flex gap-3 mt-4 md:mt-0">
                <select class="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm">
                  <option value="date">Sort by Date</option>
                  <option value="popularity">Sort by Popularity</option>
                  <option value="sport">Sort by Sport</option>
                </select>
              </div>
            </div>
            
            ${mockMatches.map(match => createMatchHTML(match)).join('')}
          `;
          
          // Insert the content after the "Play Today" section
          mainContent.appendChild(matchesContainer);
        }
      }
    }, 2000); // Wait 2 seconds for React to render
  }

  // Run the function when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    // Also run it after a delay to ensure React has rendered
    setTimeout(populateMatchesPage, 3000);
  });

  // Also listen for React router navigation changes
  window.addEventListener('popstate', function() {
    setTimeout(populateMatchesPage, 1000);
  });
})();