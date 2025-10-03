// Mock data injector script
// This script runs in the browser and injects mock data directly into the React components

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

  // Function to inject mock data into the page
  function injectMockData() {
    // Check if we're on the matches page
    if (window.location.pathname === '/matches') {
      // Try to find the React root and inject data
      const rootElement = document.getElementById('root');
      if (rootElement) {
        // Create a custom event with mock data
        window.dispatchEvent(new CustomEvent('tk999MockData', {
          detail: {
            matches: mockMatches,
            user: {
              id: 'TK999',
              name: 'Demo User',
              balance: 1000,
              currency: 'BDT',
              membership: 'Member',
              avatar: '⭐',
              email: 'demo@example.com',
              phone: '+1234567890',
              joinDate: new Date('2025-09-28').toISOString(),
              totalBets: 0,
              wins: 0,
              losses: 0,
              role: 'user',
              favoriteSports: ['Football', 'Cricket', 'Basketball', 'Tennis']
            }
          }
        }));
      }
    }
  }

  // Run the injection when the page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectMockData);
  } else {
    injectMockData();
  }

  // Also run on navigation changes
  window.addEventListener('popstate', injectMockData);

  // Periodically check and inject data
  setInterval(injectMockData, 5000);
})();