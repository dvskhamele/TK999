import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPageEnhanced';
import MatchesPage from './pages/MatchesPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPage from './pages/AdminPage';
import DashboardTestPage from './pages/DashboardTestPage';
import './index.css'; // Import the main CSS file

// Simple mock functions to avoid TypeScript errors
const mockLogin = async () => true;
const mockRegister = async () => true;

// Mock user object that matches the expected User interface
const mockUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@example.com',
  phone: '+1234567890',
  role: 'user' as const,
  balance: 1000,
  registrationDate: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  bettingPreferences: ['Football', 'Basketball'],
  riskLevel: 'medium' as const,
  totalBets: 0,
  totalWins: 0,
  favoriteSports: ['Football', 'Basketball', 'Tennis']
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={mockLogin} />} />
        <Route path="/register" element={<RegisterPage onRegister={mockRegister} />} />
        <Route path="/dashboard" element={<DashboardPage 
          user={mockUser} 
          onLogout={() => {}} 
          onDeposit={() => {}} 
          onWithdraw={() => {}} 
          getUserDashboard={() => ({profile: mockUser, transactions: [], notifications: [], wallet: {balance: 1000}, bets: []})} 
          notifications={[]} 
          onMarkNotificationRead={() => {}} 
          onShowAssistant={() => {}} 
          onUpdateProfile={() => {}} 
        />} />
        <Route path="/matches" element={<MatchesPage 
          user={mockUser} 
          matches={[]} 
          onPlaceBet={() => {}} 
          onLogout={() => {}} 
          onShowAssistant={() => {}} 
        />} />
        <Route path="/profile" element={<UserProfilePage 
          user={mockUser} 
          onUpdateProfile={() => {}} 
          onLogout={() => {}} 
          onDeposit={() => {}} 
          onWithdraw={() => {}} 
          onShowAssistant={() => {}} 
          getUserDashboard={() => ({profile: mockUser, transactions: [], notifications: [], wallet: {balance: 1000}, bets: []})} 
        />} />
        <Route path="/admin" element={<AdminPage 
          matches={[]} 
          onUpdateMatchResult={() => {}} 
          getAdminData={() => ({matches: [], users: [], bets: [], transactions: [], notifications: []})} 
          onLogout={() => {}} 
          analytics={{
            totalUsers: 0,
            totalMatches: 0,
            totalBets: 0,
            totalBetAmount: 0,
            totalWins: 0,
            totalPayouts: 0,
            activeUsers: 0,
            popularSports: [],
            revenue: 0
          }} 
        />} />
        <Route path="/dashboard-test" element={<DashboardTestPage />} />
      </Routes>
    </Router>
  );
};

export default App;