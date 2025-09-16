import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Trophy, Calendar, TrendingUp, Search, Filter, Star, Clock, Users, Gamepad2, Play, DollarSign } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'staff';
  balance: number;
  registrationDate: string;
  lastLogin: string;
  bettingPreferences: string[];
  riskLevel: 'low' | 'medium' | 'high';
  totalBets: number;
  totalWins: number;
  favoriteSports: string[];
}

interface Match {
  id: number;
  teamA: string;
  teamB: string;
  date: string;
  odds: { [key: string]: number };
  result: string | null;
  category: string;
  status: 'upcoming' | 'live' | 'finished';
  liveScore?: { teamA: number; teamB: number };
  popularity?: number;
}

interface MatchesPageProps {
  user: User;
  matches: Match[];
  onPlaceBet: (matchId: number, team: string, amount: number) => void;
  onLogout: () => void;
  onShowAssistant: () => void;
}

const MatchesPage: React.FC<MatchesPageProps> = ({ 
  user, 
  matches, 
  onPlaceBet,
  onLogout,
  onShowAssistant
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [betAmount, setBetAmount] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const handlePlaceBet = (matchId: number, team: string) => {
    const amount = prompt(`Enter amount to bet on ${team}:`, betAmount.toString());
    if (amount && !isNaN(parseInt(amount)) && parseInt(amount) > 0) {
      try {
        onPlaceBet(matchId, team, parseInt(amount));
        setSelectedMatch(null);
        setSelectedTeam('');
      } catch (err: any) {
        setError(err.message || 'Failed to place bet');
        setTimeout(() => setError(''), 3000);
      }
    } else if (amount) {
      alert('Please enter a valid amount');
    }
  };

  const handleQuickBet = (matchId: number, team: string, amount: number) => {
    try {
      onPlaceBet(matchId, team, amount);
    } catch (err: any) {
      setError(err.message || 'Failed to place bet');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  // Group matches by category
  const matchesByCategory: { [key: string]: Match[] } = {
    'All': matches
  };
  
  matches.forEach(match => {
    if (!matchesByCategory[match.category]) {
      matchesByCategory[match.category] = [];
    }
    matchesByCategory[match.category].push(match);
  });

  // Filter and sort matches
  const filteredMatches = matches.filter(match => {
    // Category filter
    const categoryMatch = activeCategory === 'All' || match.category === activeCategory;
    
    // Status filter
    const statusMatch = statusFilter === 'All' || match.status === statusFilter;
    
    // Search term filter
    const searchMatch = searchTerm === '' || 
      match.teamA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.teamB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return categoryMatch && statusMatch && searchMatch;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'popularity') {
      return (b.popularity || 0) - (a.popularity || 0);
    } else {
      return a.category.localeCompare(b.category);
    }
  });

  const getSportIcon = (category: string) => {
    switch (category) {
      case 'Cricket':
        return '🏏';
      case 'Football':
        return '⚽';
      case 'Basketball':
        return '🏀';
      case 'Tennis':
        return '🎾';
      default:
        return '🏆';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get user's favorite teams
  const getFavoriteTeams = () => {
    const allTeams = matches.flatMap(match => [match.teamA, match.teamB]);
    return [...new Set(allTeams)].slice(0, 5);
  };

  const favoriteTeams = getFavoriteTeams();

  // Get unique categories for filter
  const categories = ['All', ...Object.keys(matchesByCategory).filter(cat => cat !== 'All')];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link 
              to="/dashboard" 
              className="text-2xl md:text-3xl font-bold text-white flex items-center group"
            >
              <span className="text-2xl md:text-3xl mr-2 group-hover:rotate-12 transition-transform duration-300">🎲</span>
              TK999
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-3 rounded-full font-bold flex items-center shadow-lg">
              <DollarSign className="mr-2" size={20} />
              <span className="text-lg">{user.balance.toLocaleString()} BDT</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold">{user?.name || 'User'}</p>
                <p className="text-blue-100 text-sm">
                  {user?.role === 'admin' ? 'Admin' : user?.role === 'staff' ? 'Staff' : 'Member'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link 
                to="/dashboard" 
                className="btn btn-success flex flex-col items-center justify-center w-16 h-16 rounded-2xl transform transition-all duration-300 hover:scale-110"
                title="Dashboard"
              >
                <span className="text-2xl">📊</span>
                <span className="text-xs mt-1">Dashboard</span>
              </Link>
              
              <Link 
                to="/matches" 
                className="btn btn-primary flex flex-col items-center justify-center w-16 h-16 rounded-2xl transform transition-all duration-300 hover:scale-110"
                title="Matches"
              >
                <span className="text-2xl">⚽</span>
                <span className="text-xs mt-1">Matches</span>
              </Link>
              
              {(user?.role === 'admin' || user?.role === 'staff') && (
                <Link 
                  to="/admin" 
                  className="btn btn-warning flex flex-col items-center justify-center w-16 h-16 rounded-2xl transform transition-all duration-300 hover:scale-110"
                  title="Admin"
                >
                  <span className="text-2xl">⚙️</span>
                  <span className="text-xs mt-1">Admin</span>
                </Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="btn btn-danger flex flex-col items-center justify-center w-16 h-16 rounded-2xl transform transition-all duration-300 hover:scale-110"
                title="Logout"
              >
                <span className="text-2xl">🚪</span>
                <span className="text-xs mt-1">Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
            <Gamepad2 className="mr-3 text-3xl" />
            Play Today
          </h2>
          <p className="text-gray-600 mt-2">Choose your matches and place your bets</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search matches, teams, or sports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn btn-primary flex items-center"
                >
                  <Filter className="mr-2" size={18} />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                
                <button
                  onClick={onShowAssistant}
                  className="btn btn-warning flex items-center"
                >
                  <Zap className="mr-2" size={18} />
                  Smart Tips
                </button>
              </div>
            </div>
            
            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="All">All Statuses</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="finished">Finished</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setStatusFilter('All');
                      setSearchTerm('');
                    }}
                    className="w-full btn btn-secondary"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                    activeCategory === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => setActiveCategory('All')}
                >
                  <Trophy className="mr-2" size={16} />
                  All Sports
                </button>
                {categories
                  .filter(cat => cat !== 'All')
                  .map(category => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      <span className="mr-2">{getSportIcon(category)}</span>
                      {category}
                    </button>
                  ))
                }
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="popularity">Sort by Popularity</option>
                  <option value="sport">Sort by Sport</option>
                </select>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-blue-600 mr-1" size={16} />
                  <p className="text-2xl font-bold text-blue-600">{matches.filter(m => m.status === 'live').length}</p>
                </div>
                <p className="text-sm text-gray-600">Live Matches</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="text-green-600 mr-1" size={16} />
                  <p className="text-2xl font-bold text-green-600">{matches.filter(m => m.status === 'upcoming').length}</p>
                </div>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="text-purple-600 mr-1" size={16} />
                  <p className="text-2xl font-bold text-purple-600">{user.favoriteSports.length}</p>
                </div>
                <p className="text-sm text-gray-600">Favorite Sports</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="text-yellow-600 mr-1" size={16} />
                  <p className="text-2xl font-bold text-yellow-600">{user.balance.toLocaleString()}</p>
                </div>
                <p className="text-sm text-gray-600">Your Balance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="card mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-t-2xl">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Zap className="mr-2" size={20} />
              Daily Picks for You
            </h3>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {favoriteTeams.map(team => (
                <div key={team} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg flex-1 min-w-[200px]">
                  <h4 className="font-bold text-gray-800">{team}</h4>
                  <p className="text-sm text-gray-600 mt-1">Based on your preferences</p>
                  <button
                    onClick={() => {
                      // Find upcoming match for this team
                      const match = matches.find(m => 
                        m.status === 'upcoming' && 
                        (m.teamA === team || m.teamB === team)
                      );
                      if (match) {
                        setSelectedMatch(match.id);
                        // Auto-select the team
                        setSelectedTeam(match.teamA === team ? match.teamA : match.teamB);
                      }
                    }}
                    className="btn btn-success text-sm mt-2 w-full"
                  >
                    View Matches
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Matches List */}
        {sortedMatches.length > 0 ? (
          sortedMatches.map((match) => (
            <div key={match.id} className="card mb-6">
              <div className="p-6">
                {/* Match Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getSportIcon(match.category)}</span>
                    <div>
                      <h3 className="text-xl font-bold">{match.teamA} vs {match.teamB}</h3>
                      <p className="text-gray-600">{match.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(match.status)}`}>
                      {match.status === 'live' ? '🔴 LIVE' : match.status === 'upcoming' ? '⏰ UPCOMING' : '✅ FINISHED'}
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="mr-1" size={16} />
                      {new Date(match.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {/* Live Score (if applicable) */}
                {match.status === 'live' && match.liveScore && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {match.liveScore.teamA} - {match.liveScore.teamB}
                    </div>
                    <p className="text-red-700 font-medium">LIVE SCORE</p>
                  </div>
                )}
                
                {/* Match Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Teams and Odds */}
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {Object.entries(match.odds).map(([team, odd]) => (
                        <div 
                          key={team} 
                          className="border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-bold mb-2">{team}</h4>
                          <div className="text-2xl font-bold text-blue-600 mb-3">{odd.toFixed(2)}</div>
                          
                          {/* Quick Bet Buttons */}
                          <div className="flex gap-2 justify-center mb-3">
                            {[100, 250, 500].map(amount => (
                              <button
                                key={amount}
                                onClick={() => handleQuickBet(match.id, team, amount)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                                disabled={match.status !== 'upcoming' || user.balance < amount}
                              >
                                {amount}
                              </button>
                            ))}
                          </div>
                          
                          <button
                            onClick={() => {
                              setSelectedMatch(match.id);
                              setSelectedTeam(team);
                            }}
                            className="btn btn-primary w-full"
                            disabled={match.status !== 'upcoming'}
                            title={match.status !== 'upcoming' ? "Match not available for betting" : `Bet on ${team}`}
                          >
                            <Play className="mr-2" size={16} />
                            Bet Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Match Info */}
                  <div className="border rounded-xl p-4">
                    <h4 className="font-bold mb-3 flex items-center">
                      <TrendingUp className="mr-2" size={18} />
                      Match Info
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{new Date(match.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sport:</span>
                        <span className="font-medium">{match.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium capitalize">{match.status}</span>
                      </div>
                      
                      {match.popularity && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Popularity:</span>
                          <span className="font-medium">
                            {match.popularity}/100
                          </span>
                        </div>
                      )}
                      
                      {match.result && (
                        <div className="pt-3 mt-3 border-t">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Result:</span>
                            <span className="font-bold text-green-600">{match.result}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bet Placement Form (if selected) */}
                {selectedMatch === match.id && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-bold text-lg mb-4">Place Your Bet</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium">Selected Team:</span>
                            <span className="font-bold text-lg">{selectedTeam}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Odds:</span>
                            <span className="font-bold text-lg text-blue-600">
                              {match.odds[selectedTeam]?.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Bet Amount (BDT)
                        </label>
                        <input
                          type="number"
                          value={betAmount}
                          onChange={(e) => setBetAmount(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="10"
                          max={user.balance}
                        />
                        <div className="mt-2 text-sm text-gray-600">
                          Max: {user.balance} BDT
                        </div>
                        <div className="mt-2 text-sm font-medium">
                          Potential Win: <span className="text-green-600">
                            {(betAmount * (match.odds[selectedTeam] || 1)).toFixed(2)} BDT
                          </span>
                        </div>
                        <button
                          onClick={() => handlePlaceBet(match.id, selectedTeam)}
                          className="btn btn-success w-full mt-4"
                          disabled={betAmount > user.balance || betAmount < 10}
                        >
                          <Play className="mr-2" size={16} />
                          Confirm Bet
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMatch(null);
                            setSelectedTeam('');
                          }}
                          className="btn btn-secondary w-full mt-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card p-12 text-center">
            <div className="text-7xl mb-6">⚽</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Matches Found</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              There are currently no matches matching your filters. Try adjusting your filters or check back later for new matches!
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setStatusFilter('All');
                setSearchTerm('');
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MatchesPage;