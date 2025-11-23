'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/key-stages');
    } catch (error: any) {
      setGeneralError(
        error.response?.data?.error?.message ||
          'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google Login clicked');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-bold text-black">Log In</h1>

      {generalError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-[100px]">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
        />

        <div className="space-y-4">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-base text-black cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-base text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" variant="auth" fullWidth isLoading={isLoading}>
          Log In
        </Button>
      </form>

      <div className="text-center">
        <p className="text-xl text-black">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold hover:text-primary transition"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Divider with OR */}
      <div className="relative flex items-center justify-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-xl text-[#7A7A7A]">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full h-16 bg-[#BDD0D2] rounded-[15px] flex items-center justify-center gap-3 text-xl text-black hover:bg-[#A8BFC1] transition"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Log In with Google
      </button>
    </div>
  );
}
