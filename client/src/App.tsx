import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GameFocusedDashboard from './pages/GameFocusedDashboard';
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
  totalBets: 12,
  totalWins: 7,
  favoriteSports: ['Football', 'Basketball', 'Tennis']
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={mockLogin} />} />
        <Route path="/register" element={<RegisterPage onRegister={mockRegister} />} />
        <Route path="/dashboard" element={<GameFocusedDashboard 
          user={mockUser} 
          onLogout={() => {}} 
          onDeposit={() => {}} 
          onWithdraw={() => {}} 
          getUserDashboard={() => ({profile: mockUser, transactions: [
            {id: 1, userId: 1, type: 'Deposit', amount: 500, date: new Date().toISOString(), description: 'Initial deposit', balanceAfter: 1500},
            {id: 2, userId: 1, type: 'Bet', amount: 100, date: new Date().toISOString(), description: 'Bet on Match #123', balanceAfter: 1400},
            {id: 3, userId: 1, type: 'Win', amount: 250, date: new Date().toISOString(), description: 'Winnings from Match #123', balanceAfter: 1650}
          ], notifications: [
            {id: 1, userId: 1, title: 'Welcome Bonus', message: 'You received a 500 BDT welcome bonus!', date: new Date().toISOString(), read: false, type: 'success'},
            {id: 2, userId: 1, title: 'Bet Won!', message: 'Congratulations! Your bet on Match #123 won.', date: new Date().toISOString(), read: false, type: 'success'}
          ], wallet: {balance: 1650}, bets: [
            {id: 1, userId: 1, matchId: 123, teamChosen: 'Team A', amount: 100, status: 'Won', date: new Date().toISOString(), potentialWin: 250, odds: 2.5}
          ]})} 
          notifications={[
            {id: 1, userId: 1, title: 'Welcome Bonus', message: 'You received a 500 BDT welcome bonus!', date: new Date().toISOString(), read: false, type: 'success'},
            {id: 2, userId: 1, title: 'Bet Won!', message: 'Congratulations! Your bet on Match #123 won.', date: new Date().toISOString(), read: false, type: 'success'}
          ]} 
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