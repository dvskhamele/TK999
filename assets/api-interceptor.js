// API interceptor for the betting platform
// This script should be loaded before the main application bundle

// Enhanced mock data for the betting application
window.enhancedMockData = {
  user: {
    id: 'TK999',
    name: 'Demo User',
    balance: 1000,
    currency: 'BDT',
    membership: 'Member',
    avatar: '⭐',
    email: 'demo@example.com',
    phone: '+1234567890',
    joinDate: new Date('2025-09-28'),
    totalBets: 0,
    wins: 0,
    losses: 0
  },
  
  dashboardStats: {
    totalMatches: 25,
    liveMatches: 3,
    upcomingMatches: 22,
    favoriteSports: ['Football', 'Cricket', 'Basketball', 'Tennis'],
    dailyPicks: 7,
    winRate: 0,
    totalBetAmount: 0,
    revenue: 0
  },
  
  matches: [
    // Live matches
    {
      id: 1,
      category: 'Football',
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
      date: new Date(Date.now() - 3600000).toISOString(),
      popularity: 95
    },
    {
      id: 2,
      category: 'Cricket',
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
      date: new Date(Date.now() - 7200000).toISOString(),
      popularity: 90
    },
    {
      id: 3,
      category: 'Tennis',
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
      date: new Date(Date.now() - 3600000).toISOString(),
      popularity: 85
    },
    // Upcoming matches
    {
      id: 4,
      category: 'Football',
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
      date: new Date(Date.now() + 3600000).toISOString(),
      popularity: 98
    },
    {
      id: 5,
      category: 'Basketball',
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
      date: new Date(Date.now() + 7200000).toISOString(),
      popularity: 80
    },
    {
      id: 6,
      category: 'Football',
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
      date: new Date(Date.now() + 10800000).toISOString(),
      popularity: 75
    },
    {
      id: 7,
      category: 'Football',
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
      date: new Date(Date.now() + 14400000).toISOString(),
      popularity: 88
    },
    {
      id: 8,
      category: 'Cricket',
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
      date: new Date(Date.now() + 18000000).toISOString(),
      popularity: 92
    },
    {
      id: 9,
      category: 'Tennis',
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
      date: new Date(Date.now() + 21600000).toISOString(),
      popularity: 87
    },
    {
      id: 10,
      category: 'Basketball',
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
      date: new Date(Date.now() + 25200000).toISOString(),
      popularity: 70
    },
    {
      id: 11,
      category: 'Football',
      league: 'Ligue 1',
      teamA: 'PSG',
      teamB: 'Monaco',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 28800000), // 8 hours from now
      odds: {
        teamA: 1.4,
        draw: 4.5,
        teamB: 6.0
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 28800000).toISOString(),
      popularity: 65
    },
    {
      id: 12,
      category: 'Rugby',
      league: 'Six Nations',
      teamA: 'England',
      teamB: 'France',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 32400000), // 9 hours from now
      odds: {
        teamA: 2.0,
        draw: 18.0,
        teamB: 3.2
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 32400000).toISOString(),
      popularity: 60
    },
    {
      id: 13,
      category: 'Baseball',
      league: 'MLB',
      teamA: 'Yankees',
      teamB: 'Red Sox',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 36000000), // 10 hours from now
      odds: {
        teamA: 1.95,
        teamB: 1.85
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 36000000).toISOString(),
      popularity: 55
    },
    {
      id: 14,
      category: 'Hockey',
      league: 'NHL',
      teamA: 'Rangers',
      teamB: 'Bruins',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 39600000), // 11 hours from now
      odds: {
        teamA: 2.1,
        teamB: 1.75
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 39600000).toISOString(),
      popularity: 50
    },
    {
      id: 15,
      category: 'Football',
      league: 'Eredivisie',
      teamA: 'Ajax',
      teamB: 'PSV',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 43200000), // 12 hours from now
      odds: {
        teamA: 1.8,
        draw: 3.6,
        teamB: 4.0
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 43200000).toISOString(),
      popularity: 45
    },
    {
      id: 16,
      category: 'Volleyball',
      league: 'World Championship',
      teamA: 'Brazil',
      teamB: 'Poland',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 46800000), // 13 hours from now
      odds: {
        teamA: 2.2,
        teamB: 1.65
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 46800000).toISOString(),
      popularity: 40
    },
    {
      id: 17,
      category: 'Football',
      league: 'Premier League',
      teamA: 'Arsenal',
      teamB: 'Chelsea',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 50400000), // 14 hours from now
      odds: {
        teamA: 2.1,
        draw: 3.2,
        teamB: 3.5
      },
      isLive: false,
      isFavorite: true,
      date: new Date(Date.now() + 50400000).toISOString(),
      popularity: 90
    },
    {
      id: 18,
      category: 'Cricket',
      league: 'Test Series',
      teamA: 'England',
      teamB: 'Pakistan',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 54000000), // 15 hours from now
      odds: {
        teamA: 1.7,
        teamB: 2.2
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 54000000).toISOString(),
      popularity: 65
    },
    {
      id: 19,
      category: 'Tennis',
      league: 'French Open',
      teamA: 'Nadal',
      teamB: 'Tsitsipas',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 57600000), // 16 hours from now
      odds: {
        teamA: 1.8,
        teamB: 2.0
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 57600000).toISOString(),
      popularity: 85
    },
    {
      id: 20,
      category: 'Basketball',
      league: 'EuroLeague',
      teamA: 'Real Madrid',
      teamB: 'Barcelona',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 61200000), // 17 hours from now
      odds: {
        teamA: 1.9,
        teamB: 1.85
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 61200000).toISOString(),
      popularity: 80
    },
    {
      id: 21,
      category: 'Football',
      league: 'Champions League',
      teamA: 'Bayern Munich',
      teamB: 'PSG',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 64800000), // 18 hours from now
      odds: {
        teamA: 2.4,
        draw: 3.4,
        teamB: 2.7
      },
      isLive: false,
      isFavorite: true,
      date: new Date(Date.now() + 64800000).toISOString(),
      popularity: 95
    },
    {
      id: 22,
      category: 'Cricket',
      league: 'World Cup',
      teamA: 'New Zealand',
      teamB: 'Bangladesh',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 68400000), // 19 hours from now
      odds: {
        teamA: 1.5,
        teamB: 3.8
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 68400000).toISOString(),
      popularity: 55
    },
    {
      id: 23,
      category: 'Tennis',
      league: 'Australian Open',
      teamA: 'Medvedev',
      teamB: 'Zverev',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 72000000), // 20 hours from now
      odds: {
        teamA: 2.0,
        teamB: 1.8
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 72000000).toISOString(),
      popularity: 75
    },
    {
      id: 24,
      category: 'Football',
      league: 'Europa League',
      teamA: 'Juventus',
      teamB: 'Arsenal',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 75600000), // 21 hours from now
      odds: {
        teamA: 2.1,
        draw: 3.3,
        teamB: 3.2
      },
      isLive: false,
      isFavorite: false,
      date: new Date(Date.now() + 75600000).toISOString(),
      popularity: 82
    },
    {
      id: 25,
      category: 'Basketball',
      league: 'NBA Playoffs',
      teamA: 'Lakers',
      teamB: 'Warriors',
      teamAScore: null,
      teamBScore: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 79200000), // 22 hours from now
      odds: {
        teamA: 2.0,
        teamB: 1.8
      },
      isLive: false,
      isFavorite: true,
      date: new Date(Date.now() + 79200000).toISOString(),
      popularity: 93
    }
  ],
  
  dailyPicks: [
    {
      id: 1,
      matchId: 1,
      recommendation: 'Manchester United to win',
      confidence: 'High',
      odds: 2.2,
      status: 'pending' // 'won', 'lost', 'pending'
    },
    {
      id: 2,
      matchId: 4,
      recommendation: 'Over 2.5 goals',
      confidence: 'Medium',
      odds: 1.8,
      status: 'pending'
    },
    {
      id: 3,
      matchId: 2,
      recommendation: 'India to win by 50+ runs',
      confidence: 'High',
      odds: 2.5,
      status: 'pending'
    },
    {
      id: 4,
      matchId: 17,
      recommendation: 'Arsenal to win',
      confidence: 'Medium',
      odds: 2.1,
      status: 'pending'
    },
    {
      id: 5,
      matchId: 21,
      recommendation: 'Bayern over 2.5 goals',
      confidence: 'High',
      odds: 1.9,
      status: 'pending'
    },
    {
      id: 6,
      matchId: 14,
      recommendation: 'Under 5.5 goals',
      confidence: 'Medium',
      odds: 1.7,
      status: 'pending'
    },
    {
      id: 7,
      matchId: 8,
      recommendation: 'Mumbai Indians to win',
      confidence: 'High',
      odds: 1.9,
      status: 'pending'
    }
  ],
  
  bets: []
};

// Override fetch to intercept API calls and return mock data
window.originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = args[0];
  
  // If this is an API call for matches, intercept and return mock data
  if (typeof url === 'string') {
    if (url.endsWith('/api/matches') || url.includes('/api/matches?') || url.match(/\/api\/matches$/)) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(window.enhancedMockData.matches)
          });
        }, 300);
      });
    }
    
    if (url.includes('/api/user') || url.includes('/user')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(window.enhancedMockData.user)
          });
        }, 200);
      });
    }
    
    if (url.includes('/api/bets') || url.includes('/bets')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(window.enhancedMockData.bets)
          });
        }, 200);
      });
    }
    
    if (url.includes('/api/dashboard') || url.includes('/api/stats') || url.includes('/dashboard')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(window.enhancedMockData.dashboardStats)
          });
        }, 200);
      });
    }
    
    if (url.includes('/api/bets/place') || (url.includes('/bets') && args[1] && args[1].method === 'POST')) {
      // Handle bet placement
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Get the bet data from the request
          try {
            // Parse the request body to get bet data
            const betData = JSON.parse(args[1].body);
            
            // Check if user is logged in
            const userData = JSON.parse(localStorage.getItem('tk999_user') || '{}');
            if (!userData.id) {
              reject({ 
                ok: false,
                status: 401,
                json: () => Promise.resolve({ success: false, message: 'Please log in to place bets' })
              });
              return;
            }
            
            if (betData.amount > window.enhancedMockData.user.balance) {
              reject({ 
                ok: false,
                status: 400,
                json: () => Promise.resolve({ success: false, message: 'Insufficient balance!' })
              });
              return;
            }
            
            // Create bet record
            const bet = {
              id: 'BET' + Date.now(),
              matchId: betData.matchId,
              outcome: betData.outcome,
              amount: betData.amount,
              odd: betData.odd,
              timestamp: new Date(),
              status: 'pending' // 'won', 'lost', 'pending'
            };
            
            // Add to bets array
            window.enhancedMockData.bets.push(bet);
            
            // Update user balance
            window.enhancedMockData.user.balance -= betData.amount;
            
            // Update dashboard stats
            window.enhancedMockData.dashboardStats.totalBetAmount += betData.amount;
            window.enhancedMockData.dashboardStats.totalBets += 1;
            
            // Update localStorage user balance
            if (localStorage.getItem('tk999_user')) {
              const user = JSON.parse(localStorage.getItem('tk999_user'));
              user.balance = window.enhancedMockData.user.balance;
              localStorage.setItem('tk999_user', JSON.stringify(user));
            }
            
            resolve({
              ok: true,
              status: 200,
              json: () => Promise.resolve({
                success: true,
                message: 'Bet placed successfully!',
                transactionId: 'TXN' + Date.now(),
                updatedBalance: window.enhancedMockData.user.balance,
                bet: bet
              })
            });
          } catch (e) {
            reject({
              ok: false,
              status: 400,
              json: () => Promise.resolve({ success: false, message: 'Invalid bet data' })
            });
          }
        }, 500);
      });
    }
  }
  
  // For all other requests, use the original fetch
  return window.originalFetch.apply(this, args);
};

// Also override XMLHttpRequest for compatibility with older libraries
window.originalXHR = window.XMLHttpRequest;
function MockXMLHttpRequest() {
  this._original = new window.originalXHR();
  
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
  this._original.open = (...args) => {
    const url = args[1];
    
    // Check if this is an API call we need to intercept
    if (typeof url === 'string') {
      if (url.endsWith('/api/matches') || url.includes('/api/matches?') || url.match(/\/api\/matches$/)) {
        // Intercept this call
        this._intercept = true;
        this._interceptUrl = url;
        return;
      }
    }
    
    originalOpen.apply(this._original, args);
  };
  
  // Override send to respond with mock data if needed
  const originalSend = this._original.send;
  this._original.send = (...args) => {
    if (this._intercept) {
      // Handle intercepted call with mock data
      setTimeout(() => {
        this.readyState = 4;
        this.status = 200;
        this.responseText = JSON.stringify(window.enhancedMockData.matches);
        if (this.onreadystatechange) this.onreadystatechange();
        if (this.onload) this.onload();
      }, 300);
      return;
    }
    
    originalSend.apply(this._original, args);
  };
}
window.XMLHttpRequest = MockXMLHttpRequest;

// Initialize the mock data in localStorage if not already present
document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('tk999_user')) {
    const defaultUser = {
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
      losses: 0
    };
    
    localStorage.setItem('tk999_user', JSON.stringify(defaultUser));
    console.log('Demo user initialized in localStorage');
  }
});

// Listen for custom events to inject mock data directly into the page
window.addEventListener('load', function() {
  // Dispatch a custom event with the mock data
  window.dispatchEvent(new CustomEvent('mockDataReady', { 
    detail: { 
      matches: window.enhancedMockData.matches,
      user: window.enhancedMockData.user
    }
  }));
});