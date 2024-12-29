import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  general?: string;
}

interface DatabaseCheckResult {
  emailExists: boolean;
  nameExists: boolean;
}

interface CreateUserResult {
  success: boolean;
  error?: string;
}

const SignUpForm: React.FC = () => {
  const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Form data state
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // UI states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Error states
  const [errors, setErrors] = useState<FormErrors>({});

  // Database check function - to be implemented
  const checkExistingUser = async (): Promise<DatabaseCheckResult> => {
    // TODO: Implement your database check logic here
    return {
      emailExists: false,
      nameExists: false
    };
  };

  // Create user function - to be implemented
  const createUser = async (): Promise<CreateUserResult> => {
    // TODO: Implement your database creation logic here
    return {
      success: true
    };
  };

  const validateForm = async (): Promise<FormErrors> => {
    const newErrors: FormErrors = {};
  
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s-']+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
    }
  
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s-']+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const restrictedEmails = ['test@test.com', 'test@gmail.com'];
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (restrictedEmails.includes(formData.email.toLowerCase())) {
      newErrors.email = 'This email address is not allowed';
    }
  
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!/(?=.*[a-z])/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
      }
      if (!/(?=.*[A-Z])/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      }
      if (!/(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
      }
      if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character';
      }
    }
  
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
  
    return newErrors;
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validationErrors = await validateForm();
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Here you will implement your database logic
      console.log('Form data ready for database:', formData);
      
      // Placeholder for success redirect
      alert('Form validated successfully! Ready for database integration.');
      
    } catch (error) {
      setErrors({
        general: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex justify-center mb-8">
        <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center relative">
          <span className="text-lg font-semibold">1</span>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 transform rotate-45"></div>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-center mb-2">Create Account</h1>
      <p className="text-gray-500 text-center mb-8">
        Please fill in your information to create an account
      </p>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.firstName ? 'border-red-500' : 'border-blue-200'
              } focus:outline-none focus:border-blue-500 disabled:bg-gray-100`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.lastName ? 'border-red-500' : 'border-blue-200'
              } focus:outline-none focus:border-blue-500 disabled:bg-gray-100`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email field */}
        <div className="space-y-1">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-blue-200'
            } focus:outline-none focus:border-blue-500 disabled:bg-gray-100`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password fields */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-blue-200'
                } focus:outline-none focus:border-blue-500 disabled:bg-gray-100`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.confirmPassword ? 'border-red-500' : 'border-blue-200'
              } focus:outline-none focus:border-blue-500 disabled:bg-gray-100`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Terms and conditions */}
        <div className="space-y-1">
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAcceptTerms(e.target.checked);
                if (e.target.checked && errors.terms) {
                  setErrors(prev => ({
                    ...prev,
                    terms: undefined
                  }));
                }
              }}
              disabled={isSubmitting}
              className="mr-2 h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">I accept the terms and conditions</span>
          </label>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}
        </div>

        {/* Sign up button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {/* Sign in link */}
      <p className="text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;