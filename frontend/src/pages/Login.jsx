import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

/**
 * Login Page Component
 * Sprint 02, Day 6, Member 1
 *
 * A centered login form with email and password fields
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Email and password validation function
  const validateForm = () => {
    const newErrors = {};

    // Email validation - regex format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation - length must be > 6
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length <= 6) {
      newErrors.password = 'Password must be more than 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validate form before submission
    const validationErrors = validateForm();

    // If there are errors, set them and prevent submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors on successful validation
    setErrors({});

    // Set loading state to true
    setLoading(true);

    // Simulate async login process (actual API call will be added in later days)
    setTimeout(() => {
      try {
        console.log('Login attempted with:', { email, password });
        // API call will go here in future days
        // For now, assume success
      } catch (error) {
        console.error('Login error:', error);
        // Optionally set an error state for the user
      } finally {
        // Reset loading state regardless of success or failure
        setLoading(false);
      }
    }, 1500); // Simulate a 1.5-second network request
  };

  // Email icon
  const EmailIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
      />
    </svg>
  );

  // Lock icon
  const LockIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <Card shadow="lg">
          <Card.Header>
            <div className="px-6 pt-6">
              <h2 className="text-3xl font-bold text-gray-900 text-center">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-600 text-center mt-2">
                Sign in to continue to CareerVerse
              </p>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    icon={<EmailIcon />}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    icon={<LockIcon />}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-6 mb-2"
                  isLoading={loading}
                >
                  Sign In
                </Button>
              </form>
            </div>
          </Card.Body>

          <Card.Footer>
            <div className="px-6 pb-6">
              <p className="text-sm text-gray-600 text-center">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Login;
