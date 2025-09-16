import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Wallet, 
  TrendingUp, 
  History, 
  Bell,
  Zap,
  Award,
  Target,
  Settings,
  Calendar,
  Trophy,
  CreditCard,
  Gamepad2,
  Camera,
  Save,
  Edit
} from 'lucide-react';

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

interface Transaction {
  id: number;
  userId: number;
  type: 'Deposit' | 'Withdrawal' | 'Bet' | 'Win' | 'Bonus' | 'Fee';
  amount: number;
  date: string;
  description: string;
  balanceAfter: number;
}

interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface Bet {
  id: number;
  userId: number;
  matchId: number;
  teamChosen: string;
  amount: number;
  status: 'Pending' | 'Won' | 'Lost';
  date: string;
  potentialWin: number;
  odds: number;
}

interface DashboardData {
  profile: User | null;
  transactions: Transaction[];
  notifications: Notification[];
  wallet: { balance: number };
  bets: Bet[];
}

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  getUserDashboard: (userId: number) => DashboardData;
  notifications: Notification[];
  onMarkNotificationRead: (id: number) => void;
  onShowAssistant: () => void;
  onUpdateProfile: (updatedUser: User) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ 
  user, 
  onLogout, 
  onDeposit, 
  onWithdraw,
  getUserDashboard,
  notifications,
  onMarkNotificationRead,
  onShowAssistant,
  onUpdateProfile
}) => {
  console.log('DashboardPage component rendered with props:', { user, notifications });
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  // Profile editing states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({...user});
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    console.log('DashboardPage useEffect called with user.id:', user.id);
    const fetchData = () => {
      try {
        console.log('Calling getUserDashboard with user.id:', user.id);
        const data = getUserDashboard(user.id);
        console.log('Dashboard data fetched:', data);
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        console.log('Setting isLoading to false');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.id, getUserDashboard]);

  const handleDeposit = () => {
    const amount = prompt('Enter amount to deposit:');
    if (amount && !isNaN(parseInt(amount)) && parseInt(amount) > 0) {
      try {
        onDeposit(parseInt(amount));
        // Refresh data
        const data = getUserDashboard(user.id);
        setDashboardData(data);
      } catch (error: any) {
        alert(error.message || 'Deposit failed');
      }
    } else if (amount) {
      alert('Please enter a valid amount');
    }
  };

  const handleWithdraw = () => {
    const amount = prompt('Enter amount to withdraw:');
    if (amount && !isNaN(parseInt(amount)) && parseInt(amount) > 0) {
      try {
        onWithdraw(parseInt(amount));
        // Refresh data
        const data = getUserDashboard(user.id);
        setDashboardData(data);
      } catch (error: any) {
        alert(error.message || 'Withdrawal failed');
      }
    } else if (amount) {
      alert('Please enter a valid amount');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  // Visual status indicators
  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return '📥';
      case 'Withdrawal':
        return '📤';
      case 'Bet':
        return '🎰';
      case 'Win':
        return '🏆';
      case 'Bonus':
        return '🎁';
      case 'Fee':
        return '💳';
      default:
        return '🔄';
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case 'Deposit':
        return 'bg-green-100 text-green-800';
      case 'Withdrawal':
        return 'bg-purple-100 text-purple-800';
      case 'Bet':
        return 'bg-blue-100 text-blue-800';
      case 'Win':
        return 'bg-yellow-100 text-yellow-800';
      case 'Bonus':
        return 'bg-pink-100 text-pink-800';
      case 'Fee':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-200';
      case 'warning':
        return 'bg-yellow-100 border-yellow-200';
      case 'error':
        return 'bg-red-100 border-red-200';
      default:
        return 'bg-blue-100 border-blue-200';
    }
  };

  const winRate = user.totalBets > 0 ? 
    ((user.totalWins / user.totalBets) * 100).toFixed(1) : '0.0';

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Calculate betting statistics
  const calculateBettingStats = () => {
    if (!dashboardData || !dashboardData.bets) return { totalBets: 0, totalWins: 0, totalLost: 0, winRate: 0 };
    
    const totalBets = dashboardData.bets.length;
    const totalWins = dashboardData.bets.filter(bet => bet.status === 'Won').length;
    const totalLost = dashboardData.bets.filter(bet => bet.status === 'Lost').length;
    const winRate = totalBets > 0 ? (totalWins / totalBets) * 100 : 0;
    
    return { totalBets, totalWins, totalLost, winRate };
  };

  const bettingStats = calculateBettingStats();

  // Get recent bets
  const getRecentBets = () => {
    if (!dashboardData || !dashboardData.bets) return [];
    return [...dashboardData.bets]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  };

  const recentBets = getRecentBets();

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Save profile changes
  const saveProfileChanges = () => {
    onUpdateProfile(editedUser);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
              <span className="mr-2 text-xl">💰</span>
              <span className="text-lg">{dashboardData?.wallet?.balance?.toLocaleString() || user.balance.toLocaleString()} BDT</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg relative"
                >
                  <Bell size={24} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
            <span className="mr-3 text-3xl">📊</span>
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap border-b mb-6">
          <button
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp className="mr-2" size={18} />
            Overview
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === 'transactions' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            <History className="mr-2" size={18} />
            Transactions
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === 'notifications' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="mr-2" size={18} />
            Notifications
            {unreadNotifications > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadNotifications}
              </span>
            )}
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === 'assistant' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={onShowAssistant}
          >
            <Zap className="mr-2" size={18} />
            Smart Assistant
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === 'settings' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="mr-2" size={18} />
            Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile and Stats Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <User className="mr-2" size={24} />
                    Profile
                  </h3>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="loading-spinner mb-4"></div>
                      <p className="text-gray-500">Loading profile...</p>
                    </div>
                  ) : dashboardData?.profile ? (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white mb-4">
                            {profileImage ? (
                              <img 
                                src={profileImage} 
                                alt="Profile" 
                                className="w-20 h-20 rounded-full object-cover"
                              />
                            ) : (
                              dashboardData.profile.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <button className="absolute bottom-4 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                            <label className="cursor-pointer">
                              <Camera size={16} className="text-gray-600" />
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </label>
                          </button>
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-xl text-gray-800">{dashboardData.profile.name}</h4>
                          <p className="text-gray-600 text-sm mt-1">Member since {new Date(dashboardData.profile.registrationDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="border-t pt-4 space-y-3">
                        <p className="text-gray-700 flex items-center">
                          <span className="font-semibold mr-2">📧</span> {dashboardData.profile.email}
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-semibold mr-2">📱</span> {dashboardData.profile.phone}
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-semibold mr-2">🏆</span> Win Rate: {winRate}%
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-semibold mr-2">🎰</span> Total Bets: {dashboardData.profile.totalBets}
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <span className="font-semibold mr-2">🛡️</span> Risk Level: 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            dashboardData.profile.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                            dashboardData.profile.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {dashboardData.profile.riskLevel.charAt(0).toUpperCase() + dashboardData.profile.riskLevel.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">👤</div>
                      <p className="text-gray-500">Profile not available</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Wallet className="mr-2" size={24} />
                    Wallet
                  </h3>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="loading-spinner mb-4"></div>
                      <p className="text-gray-500">Loading wallet...</p>
                    </div>
                  ) : dashboardData?.wallet ? (
                    <div className="text-center">
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                        <p className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center">
                          <span className="mr-2 text-3xl">💵</span>
                          {dashboardData.wallet.balance.toLocaleString()} 
                          <span className="text-xl md:text-2xl ml-2">BDT</span>
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={handleDeposit} 
                          className="btn btn-success flex flex-col items-center justify-center py-4"
                        >
                          <span className="text-2xl mb-1">📥</span>
                          <span className="font-semibold">Deposit</span>
                        </button>
                        <button 
                          onClick={handleWithdraw} 
                          className="btn btn-warning flex flex-col items-center justify-center py-4"
                        >
                          <span className="text-2xl mb-1">📤</span>
                          <span className="font-semibold">Withdraw</span>
                        </button>
                      </div>
                      
                      {/* Quick Deposit Options */}
                      <div className="mt-6 pt-6 border-t">
                        <p className="text-sm text-gray-500 mb-3">Quick Deposit</p>
                        <div className="flex justify-center gap-2">
                          {[500, 1000, 2000, 5000].map(amount => (
                            <button
                              key={amount}
                              onClick={() => onDeposit(amount)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm transition-colors"
                            >
                              {amount}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">💰</div>
                      <p className="text-gray-500">Wallet not available</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Performance Stats */}
              <div className="card">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Award className="mr-2" size={24} />
                    Performance
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{winRate}%</p>
                      <p className="text-sm text-gray-600">Win Rate</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">{user.totalWins}</p>
                      <p className="text-sm text-gray-600">Wins</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-yellow-600">{user.totalBets}</p>
                      <p className="text-sm text-gray-600">Total Bets</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">{user.favoriteSports.length}</p>
                      <p className="text-sm text-gray-600">Sports</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-bold mb-3">Favorite Sports</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.favoriteSports.map(sport => (
                        <span 
                          key={sport} 
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activity and Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Betting Stats */}
              <div className="card">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Gamepad2 className="mr-2" size={24} />
                    Today's Play
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{bettingStats.totalBets}</p>
                      <p className="text-sm text-gray-600">Today's Bets</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">{bettingStats.totalWins}</p>
                      <p className="text-sm text-gray-600">Wins</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-600">{bettingStats.totalLost}</p>
                      <p className="text-sm text-gray-600">Losses</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-yellow-600">{bettingStats.winRate.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Win Rate</p>
                    </div>
                  </div>
                  
                  {/* Recent Bets */}
                  <div>
                    <h4 className="font-bold mb-3 flex items-center">
                      <Calendar className="mr-2" size={18} />
                      Recent Bets
                    </h4>
                    {recentBets.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="py-2 px-3 text-left rounded-l-lg text-sm">Date</th>
                              <th className="py-2 px-3 text-left text-sm">Match</th>
                              <th className="py-2 px-3 text-left text-sm">Amount</th>
                              <th className="py-2 px-3 text-left rounded-r-lg text-sm">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentBets.map((bet) => (
                              <tr key={bet.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-3 text-sm">
                                  {new Date(bet.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-3 text-sm">
                                  Bet on {bet.teamChosen}
                                </td>
                                <td className="py-2 px-3 font-medium">
                                  {bet.amount.toFixed(2)} BDT
                                </td>
                                <td className="py-2 px-3">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    bet.status === 'Won' ? 'bg-green-100 text-green-800' :
                                    bet.status === 'Lost' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {bet.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No bets placed yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Smart Recommendations */}
              <div className="card">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Target className="mr-2" size={24} />
                    Daily Picks
                  </h3>
                </div>
                <div className="p-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-lg mb-2 flex items-center">
                      <Zap className="mr-2 text-yellow-500" size={20} />
                      Personalized for You
                    </h4>
                    <p className="text-gray-700">
                      Based on your betting history, we recommend focusing on {user.favoriteSports[0] || 'popular'} matches 
                      with value odds above 2.0 for better returns.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-bold text-green-800 mb-2">💰 Bankroll Management</h5>
                      <p className="text-sm text-green-700">
                        Never bet more than 5% of your total bankroll on a single bet.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-bold text-blue-800 mb-2">📊 Diversification</h5>
                      <p className="text-sm text-blue-700">
                        Spread your bets across different sports to reduce risk.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h5 className="font-bold text-purple-800 mb-2">⏰ Timing</h5>
                      <p className="text-sm text-purple-700">
                        Place bets early to get the best odds before they change.
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-bold text-yellow-800 mb-2">📈 Tracking</h5>
                      <p className="text-sm text-yellow-700">
                        Review your betting history weekly to identify patterns.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={onShowAssistant}
                    className="btn btn-primary w-full mt-6 flex items-center justify-center"
                  >
                    <Zap className="mr-2" size={20} />
                    Get More Smart Recommendations
                  </button>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="card">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-500 p-6 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <History className="mr-2" size={24} />
                    Recent Activity
                  </h3>
                </div>
                <div className="p-6">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="loading-spinner mb-4"></div>
                      <p className="text-gray-500">Loading activity...</p>
                    </div>
                  ) : dashboardData?.transactions && dashboardData.transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left rounded-l-lg">Date</th>
                            <th className="py-3 px-4 text-left">Type</th>
                            <th className="py-3 px-4 text-left">Amount</th>
                            <th className="py-3 px-4 text-left rounded-r-lg">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...dashboardData.transactions]
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .slice(0, 5)
                            .map((tx, index) => (
                              <tr 
                                key={tx.id} 
                                className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                              >
                                <td className="py-3 px-4">
                                  <div className="font-medium">
                                    {new Date(tx.date).toLocaleDateString()}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getTypeClass(tx.type)}`}>
                                    <span className="mr-1">{getStatusIcon(tx.type)}</span>
                                    {tx.type}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-bold text-gray-800">
                                  {tx.type === 'Withdrawal' || tx.type === 'Bet' || tx.type === 'Fee' ? '-' : '+'}
                                  {tx.amount.toLocaleString()} BDT
                                </td>
                                <td className="py-3 px-4 text-gray-600 text-sm">
                                  {tx.description}
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setActiveTab('transactions')}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View All Transactions →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📋</div>
                      <h4 className="text-xl font-medium text-gray-900 mb-2">No activity yet</h4>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Your recent transactions and betting activity will appear here.
                      </p>
                      <div className="mt-6 flex justify-center gap-4">
                        <Link 
                          to="/matches" 
                          className="btn btn-primary flex items-center"
                        >
                          <span className="mr-2">⚽</span>
                          Start Betting
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="card">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center">
                <History className="mr-2" size={24} />
                Transaction History
              </h3>
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="loading-spinner mb-4"></div>
                  <p className="text-gray-500">Loading transactions...</p>
                </div>
              ) : dashboardData?.transactions && dashboardData.transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4 text-left rounded-l-lg">📅 Date</th>
                        <th className="py-3 px-4 text-left">🔄 Type</th>
                        <th className="py-3 px-4 text-left">💵 Amount</th>
                        <th className="py-3 px-4 text-left">💰 Balance After</th>
                        <th className="py-3 px-4 text-left rounded-r-lg">📝 Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...dashboardData.transactions]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((tx, index) => (
                          <tr 
                            key={tx.id} 
                            className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                          >
                            <td className="py-3 px-4">
                              <div className="font-medium">
                                {new Date(tx.date).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getTypeClass(tx.type)}`}>
                                <span className="mr-1">{getStatusIcon(tx.type)}</span>
                                {tx.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-gray-800">
                              {tx.type === 'Withdrawal' || tx.type === 'Bet' || tx.type === 'Fee' ? '-' : '+'}
                              {tx.amount.toLocaleString()} BDT
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-700">
                              {tx.balanceAfter.toLocaleString()} BDT
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {tx.description}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h4 className="text-xl font-medium text-gray-900 mb-2">No transactions yet</h4>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Your transaction history will appear here once you start making deposits or withdrawals.
                  </p>
                  <div className="mt-6 flex justify-center gap-4">
                    <button 
                      onClick={handleDeposit} 
                      className="btn btn-success flex items-center"
                    >
                      <span className="mr-2">📥</span>
                      Make Deposit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="card">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Bell className="mr-2" size={24} />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="ml-3 bg-white text-purple-600 text-sm rounded-full px-3 py-1">
                    {unreadNotifications} unread
                  </span>
                )}
              </h3>
            </div>
            <div className="p-6">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {[...notifications]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 rounded-lg border ${getNotificationClass(notification.type)} ${
                          !notification.read ? 'border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-bold text-gray-800">{notification.title}</h4>
                          {!notification.read && (
                            <button
                              onClick={() => onMarkNotificationRead(notification.id)}
                              className="text-sm text-blue-600 hover:text-blue-800"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                        <p className="text-gray-700 mt-2">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-3">
                          {new Date(notification.date).toLocaleString()}
                        </p>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔔</div>
                  <h4 className="text-xl font-medium text-gray-900 mb-2">No notifications</h4>
                  <p className="text-gray-500">
                    You don't have any notifications at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="card">
            <div className="bg-gradient-to-r from-gray-500 to-gray-700 p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Settings className="mr-2" size={24} />
                Account Settings
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <User className="mr-2" size={20} />
                    Profile Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{editedUser.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Email Address</label>
                      {isEditingProfile ? (
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{editedUser.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      {isEditingProfile ? (
                        <input
                          type="tel"
                          value={editedUser.phone}
                          onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg">{editedUser.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <Settings className="mr-2" size={20} />
                    Preferences
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Risk Level</label>
                      {isEditingProfile ? (
                        <select
                          value={editedUser.riskLevel}
                          onChange={(e) => setEditedUser({...editedUser, riskLevel: e.target.value as any})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="low">Low Risk</option>
                          <option value="medium">Medium Risk</option>
                          <option value="high">High Risk</option>
                        </select>
                      ) : (
                        <p className="px-4 py-2 bg-gray-50 rounded-lg capitalize">{editedUser.riskLevel} Risk</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Favorite Sports</label>
                      {isEditingProfile ? (
                        <div className="flex flex-wrap gap-2">
                          {['Football', 'Cricket', 'Basketball', 'Tennis', 'Hockey'].map(sport => (
                            <label key={sport} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                              <input
                                type="checkbox"
                                checked={editedUser.favoriteSports.includes(sport)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEditedUser({
                                      ...editedUser,
                                      favoriteSports: [...editedUser.favoriteSports, sport]
                                    });
                                  } else {
                                    setEditedUser({
                                      ...editedUser,
                                      favoriteSports: editedUser.favoriteSports.filter(s => s !== sport)
                                    });
                                  }
                                }}
                                className="mr-2"
                              />
                              {sport}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {editedUser.favoriteSports.map(sport => (
                            <span key={sport} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              {sport}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Notification Preferences</label>
                      {isEditingProfile ? (
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input 
                              type="checkbox" 
                              defaultChecked 
                              className="mr-2" 
                            />
                            Email notifications
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="checkbox" 
                              defaultChecked 
                              className="mr-2" 
                            />
                            SMS notifications
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="checkbox" 
                              defaultChecked 
                              className="mr-2" 
                            />
                            Push notifications
                          </label>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="px-4 py-2 bg-gray-50 rounded-lg">Email notifications: Enabled</p>
                          <p className="px-4 py-2 bg-gray-50 rounded-lg">SMS notifications: Enabled</p>
                          <p className="px-4 py-2 bg-gray-50 rounded-lg">Push notifications: Enabled</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                {isEditingProfile ? (
                  <div className="flex gap-4">
                    <button 
                      onClick={saveProfileChanges}
                      className="btn btn-success px-6 py-2 flex items-center"
                    >
                      <Save className="mr-2" size={16} />
                      Save Changes
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditingProfile(false);
                        setEditedUser({...user});
                      }}
                      className="btn btn-secondary px-6 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="btn btn-primary px-6 py-2 flex items-center"
                  >
                    <Edit className="mr-2" size={16} />
                    Edit Profile
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className="btn btn-danger px-6 py-2 ml-4"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;