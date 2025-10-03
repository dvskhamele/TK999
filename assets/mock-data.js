// Mock data for the betting application
const mockData = {
  user: {
    id: 'TK999',
    name: 'Demo User',
    balance: 1000,
    currency: 'BDT',
    membership: 'Member',
    avatar: '⭐'
  },
  
  dashboardStats: {
    totalMatches: 15,
    liveMatches: 2,
    upcomingMatches: 13,
    favoriteSports: ['Football', 'Cricket', 'Basketball'],
    dailyPicks: 5
  },
  
  matches: [
    {
      id: 1,
      sport: 'Football',
      league: 'Premier League',
      team1: 'Manchester United',
      team2: 'Liverpool',
      team1Score: null,
      team2Score: null,
      status: 'upcoming', // 'live', 'upcoming', 'finished'
      startTime: new Date(Date.now() + 3600000), // 1 hour from now
      odds: {
        team1: 2.5,
        draw: 3.2,
        team2: 2.8
      },
      isLive: false,
      isFavorite: false
    },
    {
      id: 2,
      sport: 'Cricket',
      league: 'T20 World Cup',
      team1: 'India',
      team2: 'Australia',
      team1Score: 145,
      team2Score: 89,
      status: 'live',
      startTime: new Date(Date.now() - 7200000), // 2 hours ago
      odds: {
        team1: 1.8,
        team2: 2.1
      },
      isLive: true,
      isFavorite: true
    },
    {
      id: 3,
      sport: 'Basketball',
      league: 'NBA',
      team1: 'Lakers',
      team2: 'Warriors',
      team1Score: null,
      team2Score: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 7200000), // 2 hours from now
      odds: {
        team1: 1.9,
        team2: 1.95
      },
      isLive: false,
      isFavorite: false
    },
    {
      id: 4,
      sport: 'Football',
      league: 'La Liga',
      team1: 'Barcelona',
      team2: 'Real Madrid',
      team1Score: null,
      team2Score: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 10800000), // 3 hours from now
      odds: {
        team1: 2.3,
        draw: 3.1,
        team2: 3.0
      },
      isLive: false,
      isFavorite: true
    },
    {
      id: 5,
      sport: 'Tennis',
      league: 'Wimbledon',
      team1: 'Djokovic',
      team2: 'Nadal',
      team1Score: 2,
      team2Score: 1,
      status: 'live',
      startTime: new Date(Date.now() - 3600000), // 1 hour ago
      odds: {
        team1: 1.7,
        team2: 2.2
      },
      isLive: true,
      isFavorite: false
    },
    {
      id: 6,
      sport: 'Football',
      league: 'Serie A',
      team1: 'Juventus',
      team2: 'AC Milan',
      team1Score: null,
      team2Score: null,
      status: 'upcoming',
      startTime: new Date(Date.now() + 14400000), // 4 hours from now
      odds: {
        team1: 2.1,
        draw: 3.0,
        team2: 3.2
      },
      isLive: false,
      isFavorite: false
    }
  ],
  
  dailyPicks: [
    {
      id: 1,
      matchId: 1,
      recommendation: 'Manchester United to win',
      confidence: 'High',
      odds: 2.5,
      status: 'pending' // 'won', 'lost', 'pending'
    },
    {
      id: 2,
      matchId: 4,
      recommendation: 'Over 2.5 goals',
      confidence: 'Medium',
      odds: 1.8,
      status: 'pending'
    }
  ],
  
  bets: []
};

// Mock API functions
const mockAPI = {
  getUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.user), 200);
    });
  },
  
  getDashboardStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.dashboardStats), 200);
    });
  },
  
  getMatches: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let matches = [...mockData.matches];
        
        // Apply filters
        if (filters.status) {
          matches = matches.filter(match => match.status === filters.status);
        }
        
        if (filters.sport) {
          matches = matches.filter(match => match.sport.toLowerCase().includes(filters.sport.toLowerCase()));
        }
        
        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          matches = matches.filter(match => 
            match.team1.toLowerCase().includes(term) || 
            match.team2.toLowerCase().includes(term) ||
            match.league.toLowerCase().includes(term)
          );
        }
        
        resolve(matches);
      }, 300);
    });
  },
  
  placeBet: (betData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (betData.amount > mockData.user.balance) {
          reject({ success: false, message: 'Insufficient balance!' });
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
        mockData.bets.push(bet);
        
        // Update user balance
        mockData.user.balance -= betData.amount;
        
        resolve({
          success: true,
          message: 'Bet placed successfully!',
          transactionId: 'TXN' + Date.now(),
          updatedBalance: mockData.user.balance,
          bet: bet
        });
      }, 500);
    });
  },
  
  toggleFavorite: (matchId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const match = mockData.matches.find(m => m.id === matchId);
        if (match) {
          match.isFavorite = !match.isFavorite;
        }
        resolve({success: true, isFavorite: match.isFavorite});
      }, 200);
    });
  },
  
  getUserBets: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.bets), 200);
    });
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockData, mockAPI };
}