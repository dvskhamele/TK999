import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Shield, AlertCircle, CheckCircle, Key, Fingerprint } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => any;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [sentCode, setSentCode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // For demo purposes, we'll simulate 2FA for admin accounts
      if (email === 'admin@example.com') {
        setShowTwoFactor(true);
        setSentCode(true);
        setSuccess('2FA code sent to your registered device!');
        setTimeout(() => setSuccess(''), 3000);
        return;
      }
      
      const response = onLogin(email, password);
      if (response.user.role === 'admin') {
        setSuccess('Login successful! Redirecting to admin panel...');
        setTimeout(() => navigate('/admin'), 1500);
      } else {
        setSuccess('Login successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSubmit = () => {
    if (!twoFactorCode) {
      setError('Please enter the 2FA code');
      return;
    }
    
    // In a real implementation, this would validate the 2FA code
    if (twoFactorCode === '123456') {
      setSuccess('2FA verified! Logging in...');
      setTimeout(() => {
        setShowTwoFactor(false);
        navigate('/admin');
      }, 1500);
    } else {
      setError('Invalid 2FA code. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented in a real application');
  };

  const handleResendCode = () => {
    setSentCode(true);
    setSuccess('2FA code resent to your device!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md fade-in-up">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center rounded-t-2xl">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-blue-100">Sign in to your TK999 account</p>
        </div>
        
        <form id="login-form" onSubmit={handleSubmit} className="p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg text-center flex items-center">
              <CheckCircle className="mr-2" size={20} />
              {success}
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-center flex items-center">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}
          
          {/* 2FA Screen */}
          {showTwoFactor ? (
            <div className="space-y-6">
              <div className="text-center">
                <Fingerprint className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Two-Factor Authentication</h3>
                <p className="text-gray-600">
                  Enter the 6-digit code sent to your registered device
                </p>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Key className="mr-2 text-lg" />
                  2FA Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter 6-digit code"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    disabled={isLoading}
                    maxLength={6}
                    autoComplete="off"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Key size={20} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Didn't receive a code?{' '}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    disabled={!sentCode}
                  >
                    Resend Code
                  </button>
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowTwoFactor(false)}
                  className="btn btn-secondary flex-1"
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleTwoFactorSubmit}
                  className="btn btn-primary flex-1 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2" size={20} />
                      Verify
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Mail className="mr-2 text-lg" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </div>
                </div>
              </div>
              
              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Lock className="mr-2 text-lg" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {/* Remember Me and Forgot Password */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="mr-2"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="text-sm text-gray-600 flex items-center">
                      <Shield className="mr-1" size={16} />
                      Remember me
                    </label>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    <Key className="mr-1" size={16} />
                    Forgot password?
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mb-6">
                <button 
                  type="submit" 
                  className="w-full btn btn-primary flex items-center justify-center relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2" size={20} />
                      Sign In
                    </>
                  )}
                </button>
              </div>
              
              {/* Demo Credentials */}
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-green-700 flex items-center mb-2">
                    <User className="mr-2" size={16} />
                    Demo Credentials:
                  </span>
                  <span className="font-medium">Regular User:</span> any email + password <span className="font-mono bg-gray-100 px-2 py-1 rounded-lg">123456</span>
                  <br className="my-2" />
                  <span className="font-medium">Admin User:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded-lg">admin@example.com</span> + password <span className="font-mono bg-gray-100 px-2 py-1 rounded-lg">admin123</span>
                </p>
              </div>
              
              {/* Registration Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 flex items-center justify-center group"
                  >
                    <span className="mr-1 group-hover:mr-2 transition-all">📝</span>
                    Register now
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-all">→</span>
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;