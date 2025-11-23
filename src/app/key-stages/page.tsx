'use client';

import Link from 'next/link';
import { Container, Card, CardHeader, CardTitle, CardContent, Loading } from '@/components/ui';
import { useKeyStages } from '@/lib/hooks/useOakData';

export default function KeyStagesPage() {
  const { data: keyStages, error, isLoading } = useKeyStages();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Error Loading Key Stages
          </h2>
          <p className="text-text-light">
            Unable to load key stages. Please try again later.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Key Stages
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Select a key stage to explore subjects and lessons aligned with the
            UK curriculum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyStages?.map((stage) => (
            <Link key={stage.slug} href={`/key-stages/${stage.slug}`}>
              <Card hover>
                <CardHeader>
                  <CardTitle>{stage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary font-semibold">
                    {stage.shortCode}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
