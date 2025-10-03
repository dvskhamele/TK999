// Match data loader script
// This script will populate the matches page with mock data

(function() {
  // Create mock match data
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
  
  // Store the mock data in a global variable
  window.TK999_MOCK_MATCHES = mockMatches;
  
  // Wait for the page to load
  document.addEventListener('DOMContentLoaded', function() {
    // Try to patch the React component directly
    setTimeout(() => {
      // Dispatch a custom event with the mock data
      window.dispatchEvent(new CustomEvent('mockMatchesLoaded', { 
        detail: mockMatches 
      }));
      
      // Also try to directly patch the window.fetch function
      if (window.fetch) {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
          const url = args[0];
          
          // Check if this is a request for matches data
          if (typeof url === 'string' && (url.includes('/api/matches') || url.includes('/matches'))) {
            // Return mock data
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  ok: true,
                  status: 200,
                  json: () => Promise.resolve(mockMatches)
                });
              }, 300);
            });
          }
          
          // For all other requests, use the original fetch
          return originalFetch.apply(this, args);
        };
      }
    }, 1000);
  });
  
  // Also patch XMLHttpRequest for compatibility
  if (window.XMLHttpRequest) {
    const originalXHR = window.XMLHttpRequest;
    function MockXMLHttpRequest() {
      this._original = new originalXHR();
      
      // Proxy all properties and methods
      for (let prop in this._original) {
        if (typeof this._original[prop] === 'function') {
          this[prop] = this._original[prop].bind(this._original);
        } else {
          Object.defineProperty(this, prop, {
            get: () => this._original[prop],
            set: (val) => this._original[prop] = val,
            enumerable: true,
            configurable: true
          });
        }
      }
      
      // Override open to intercept API calls
      const originalOpen = this._original.open;
      this._original.open = function(...args) {
        const method = args[0];
        const url = args[1];
        
        // Check if this is a request for matches data
        if (typeof url === 'string' && (url.includes('/api/matches') || url.includes('/matches'))) {
          // Intercept this call
          this._intercept = true;
          this._interceptUrl = url;
          return;
        }
        
        // For all other requests, use the original open
        return originalOpen.apply(this._original, args);
      };
      
      // Override send to respond with mock data if needed
      const originalSend = this._original.send;
      this._original.send = function(...args) {
        if (this._intercept && mockMatches) {
          // Handle intercepted call with mock data
          setTimeout(() => {
            this.readyState = 4;
            this.status = 200;
            this.responseText = JSON.stringify(mockMatches);
            if (this.onreadystatechange) this.onreadystatechange();
            if (this.onload) this.onload();
          }, 300);
          return;
        }
        
        // For all other requests, use the original send
        return originalSend.apply(this._original, args);
      };
    }
    window.XMLHttpRequest = MockXMLHttpRequest;
  }
})();