import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield, AlertCircle, CheckCircle, Key } from 'lucide-react';

interface RegisterPageProps {
  onRegister: (name: string, email: string, phone: string) => any;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [sentCode, setSentCode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation (simple)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real implementation, we would send verification code first
      if (!showVerification) {
        // Mock sending verification code
        setSentCode(true);
        setShowVerification(true);
        setSuccess('Verification code sent to your email!');
        setTimeout(() => setSuccess(''), 3000);
        return;
      }
      
      // Check verification code
      if (verificationCode !== '123456') {
        setError('Invalid verification code');
        return;
      }
      
      await onRegister(name, email, phone);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    // In a real implementation, this would resend the verification code
    setSentCode(true);
    setSuccess('Verification code resent!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md fade-in-up">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center rounded-t-2xl">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-blue-100">Join TK999 today and start betting</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
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
          
          {/* Verification Step */}
          {showVerification ? (
            <>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Key className="mr-2 text-lg" />
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    disabled={isLoading}
                    maxLength={6}
                    autoComplete="off"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Key size={20} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter the 6-digit code sent to your email
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    disabled={!sentCode}
                  >
                    Resend Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowVerification(false)}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    Back to Registration
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Name Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <User className="mr-2 text-lg" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    autoComplete="name"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={20} />
                  </div>
                </div>
              </div>
              
              {/* Email Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Mail className="mr-2 text-lg" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
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
              
              {/* Phone Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Phone className="mr-2 text-lg" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+1 234 567 8900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                    autoComplete="tel"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Phone size={20} />
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
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
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
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters long
                </p>
              </div>
              
              {/* Confirm Password Field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Lock className="mr-2 text-lg" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              {/* Terms Agreement */}
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    className="mr-2 mt-1"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    disabled={isLoading}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                    I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  </label>
                </div>
              </div>
            </>
          )}
          
          {/* Submit Button */}
          <div className="mb-6">
            <button 
              type="submit" 
              className="w-full btn btn-success flex items-center justify-center relative"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  {showVerification ? 'Verifying...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <User className="mr-2" size={20} />
                  {showVerification ? 'Verify Account' : 'Create Account'}
                </>
              )}
            </button>
          </div>
          
          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 flex items-center justify-center group"
              >
                <span className="mr-1 group-hover:mr-2 transition-all">🔑</span>
                Sign in
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-all">→</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;