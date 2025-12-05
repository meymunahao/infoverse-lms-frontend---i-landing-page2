'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';

interface SignupPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SignupPromptModal({
  isOpen,
  onClose,
  title = "Sign Up to Continue",
  message = "Create a free account to access all units and lessons."
}: SignupPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Lock Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {title}
        </h2>

        <p className="text-gray-600 text-center mb-6">
          {message}
        </p>

        <div className="space-y-3">
          <Link href="/register" className="block" onClick={onClose}>
            <Button fullWidth size="lg" className="shadow-lg">
              Sign Up Free
            </Button>
          </Link>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline" onClick={onClose}>
              Log in
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">With a free account you get:</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              14-day free trial with full access
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Access to all subjects and lessons
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track your learning progress
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
