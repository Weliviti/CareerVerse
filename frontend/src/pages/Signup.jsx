import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import PasswordStrength from '../components/PasswordStrength';


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Basic validation
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Step 2: Call backend API to save user profile
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: formData.fullName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // If backend fails, we should ideally handle it (e.g., delete the Firebase user or show error)
        throw new Error(result.error_details || 'Failed to save user profile');
      }

      // Step 3: Redirect to dashboard on success
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Signup Error:', error);
      // Map Firebase errors to user-friendly messages
      let errorMessage = 'An error occurred during signup. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setErrors({ submit: errorMessage });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="text-gray-600 mt-2">Join CareerVerse today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {errors.submit && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
              {errors.submit}
            </div>
          )}
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          {/* Password strength indicator */}
          <PasswordStrength password={formData.password} />


          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          {/* Using anchor tag since react-router-dom is not yet installed per plan */}
          <a
            href="/login"
            className="text-teal-600 hover:text-teal-700 font-medium hover:underline"
          >
            Log in
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
