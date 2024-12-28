import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Example validation - you would replace these with your actual DB checks
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Example error cases
    if (email === 'test@test.com') {
      setEmailError('Email has been used!');
    }
    if (email.length == 0) {
        setEmailError('Please Enter Your Email');
      }
    
    if (password.length < 6 && password.length != 0) {
      setPasswordError('Password must be at least 6 characters');
    }
    if (password.length == 0) {
        setPasswordError('Please Enter Your Password');
      }

    if (password === 'mohamed') {
        setPasswordError('Password Incorrect');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {/* Badge/Icon at top */}
      <div className="flex justify-center mb-8">
        <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center relative">
          <span className="text-lg font-semibold">1</span>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 transform rotate-45"></div>
        </div>
      </div>

      {/* Sign in header */}
      <h1 className="text-2xl font-semibold text-center mb-2">Sign in</h1>
      <p className="text-gray-500 text-center mb-8">
        Please login to continue to your account.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email field */}
        <div className="space-y-1">
  
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-lg border ${
              emailError 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-blue-200 focus:border-blue-500'
            } focus:outline-none`}
          />
          {emailError && (
            <p className="text-red-500 text-sm">{emailError}</p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-1">

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-lg border ${
                passwordError 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-blue-200 focus:border-blue-500'
              } focus:outline-none`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>

        {/* Terms and forgot password row */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mr-2 h-4 w-4 rounded border-gray-300 rounded-[6px]"
            />
            <span className="text-sm">Accepter conditions general</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password
          </a>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign in
        </button>
      </form>

      {/* Create account link */}
      <p className="text-center mt-6 text-gray-600">
        Need an account?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Create one
        </a>
      </p>
    </div>
  );
};

export default SignInForm;