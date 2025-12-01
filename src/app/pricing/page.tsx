'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/lib/api/client';
import { cn } from '@/lib/utils/cn';

interface Plan {
  id: string;
  name: string;
  price: string;
  interval: string;
  planCode: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Individual Monthly',
    price: '₦7,500',
    interval: '/ month',
    planCode: 'PLN_ycwo3qwzubzlv3v',
    description: 'Perfect for short-term learning goals.',
    features: ['Access to all subjects', 'Unlimited practice tests', 'Progress tracking', '24/7 Support'],
  },
  {
    id: 'annual',
    name: 'Individual Annual',
    price: '₦75,000',
    interval: '/ year',
    planCode: 'PLN_o1rf7r0jl507aoq',
    description: 'Best value for year-round success.',
    features: ['Access to all subjects', 'Unlimited practice tests', 'Progress tracking', 'Priority Support', 'Save 2 months'],
    isPopular: true,
  },
  {
    id: 'family',
    name: 'Family Annual',
    price: '₦150,000',
    interval: '/ year',
    planCode: 'PLN_8et2pw5d7mfg3j1',
    description: 'Great for families with multiple learners.',
    features: ['Up to 4 accounts', 'Parental dashboard', 'Individual progress tracking', 'Family savings'],
  },
];

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleStartTrial = async (planCode: string) => {
    try {
      setLoadingPlan(planCode);
      const response = await apiClient.post<{ authorization_url: string }>(
        '/payment/start-trial',
        { planCode }
      );

      if (response.data.authorization_url) {
        window.location.href = response.data.authorization_url;
      }
    } catch (error) {
      console.error('Failed to start trial:', error);
      // Ideally, show a toast notification here
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Start your 7-day free trial today. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <span className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    Best Value
                  </span>
                </div>
              )}
              
              <Card 
                className={cn(
                  'h-full flex flex-col',
                  plan.isPopular ? 'border-primary ring-2 ring-primary ring-opacity-50 shadow-xl scale-105 z-0' : 'shadow-xl'
                )}
              >
                <CardHeader className="text-center border-b border-gray-100 pb-6 mb-6">
                  <CardTitle className="mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-2 text-gray-500">{plan.interval}</span>
                  </div>
                  <p className="mt-4 text-gray-500 text-sm">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-500 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleStartTrial(plan.planCode)}
                    isLoading={loadingPlan === plan.planCode}
                    disabled={!!loadingPlan && loadingPlan !== plan.planCode}
                    fullWidth
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    size="lg"
                  >
                    Start 7-Day Free Trial
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
