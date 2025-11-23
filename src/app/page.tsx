import Link from 'next/link';
import { Button, Container, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function Home() {
  const features = [
    {
      title: 'Key Stages 1-4',
      description:
        'Access comprehensive curriculum-aligned content for all key stages from primary to secondary education.',
      icon: '📚',
    },
    {
      title: 'Quality Content',
      description:
        'Trusted educational materials from Oak National Academy, used by thousands of schools across the UK.',
      icon: '✨',
    },
    {
      title: 'Free Resources',
      description:
        'Complete access to lessons, worksheets, and videos at no cost. Education should be accessible to all.',
      icon: '🎓',
    },
    {
      title: 'Easy Navigation',
      description:
        'Browse by subject, year group, or topic. Find exactly what you need quickly and efficiently.',
      icon: '🔍',
    },
  ];

  const keyStages = [
    { id: 'ks1', name: 'Key Stage 1', years: 'Years 1-2', ages: 'Ages 5-7' },
    { id: 'ks2', name: 'Key Stage 2', years: 'Years 3-6', ages: 'Ages 7-11' },
    { id: 'ks3', name: 'Key Stage 3', years: 'Years 7-9', ages: 'Ages 11-14' },
    { id: 'ks4', name: 'Key Stage 4', years: 'Years 10-11', ages: 'Ages 14-16' },
  ];

  return (
    <div className="bg-background-light">
      {/* Hero Section */}
      <section className="bg-background-dark text-white py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to Infoverse Digital-Ed
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Access quality educational content from Oak National Academy for
              Key Stages 1-4
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/key-stages">
                <Button variant="secondary" size="lg">
                  Explore Key Stages
                </Button>
              </Link>
              <Link href="/subjects">
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-background-dark">
                  Browse Subjects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Why Choose Infoverse Digital-Ed?
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Your gateway to comprehensive educational resources aligned with
              the UK curriculum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-accent-coral flex items-center justify-center text-3xl mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Stages Overview */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Explore by Key Stage
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Select the appropriate key stage to browse curriculum-aligned
              content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStages.map((stage) => (
              <Link key={stage.id} href={`/key-stages/${stage.id}`}>
                <Card hover>
                  <CardHeader>
                    <CardTitle>{stage.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-primary mb-1">
                      {stage.years}
                    </p>
                    <p className="text-sm text-text-light">{stage.ages}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-primary text-white rounded-card p-12 text-center shadow-card">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Explore thousands of lessons, worksheets, and educational
              resources for free
            </p>
            <Link href="/key-stages">
              <Button variant="secondary" size="lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
