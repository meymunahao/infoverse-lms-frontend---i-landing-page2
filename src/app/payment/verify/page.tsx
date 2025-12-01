'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/lib/api/client';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your trial...');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus('error');
        setMessage('No payment reference found.');
        return;
      }

      try {
        await apiClient.post('/payment/verify-trial', { reference });
        setStatus('success');
        setMessage('Trial Started!');
      } catch (error) {
        console.error('Verification failed:', error);
        setStatus('error');
        let errorMsg = 'Failed to verify payment. Please try again.';
        if (error && typeof error === 'object' && 'response' in error) {
            const err = error as { response: { data: { message: string } } };
            if (err.response?.data?.message) {
                errorMsg = err.response.data.message;
            }
        }
        setMessage(errorMsg);
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <Card className="max-w-md mx-auto text-center p-8">
      <CardContent className="flex flex-col items-center justify-center space-y-6 pt-6">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <h2 className="text-xl font-semibold text-gray-900">{message}</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleIcon className="h-20 w-20 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">{message}</h2>
            <p className="text-gray-600">
              Your subscription is now active. Enjoy your 7-day free trial!
            </p>
            <Button
              onClick={() => router.push('/dashboard')}
              fullWidth
              size="lg"
            >
              Go to Dashboard
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircleIcon className="h-20 w-20 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">Verification Failed</h2>
            <p className="text-red-600">{message}</p>
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                fullWidth
              >
                Try Again
              </Button>
              <Button
                onClick={() => router.push('/pricing')}
                variant="ghost"
                fullWidth
              >
                Back to Pricing
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function PaymentVerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        <Suspense fallback={
          <Card className="max-w-md mx-auto text-center p-8">
             <CardContent className="flex flex-col items-center justify-center space-y-6 pt-6">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
             </CardContent>
          </Card>
        }>
          <VerifyContent />
        </Suspense>
      </Container>
    </div>
  );
}
