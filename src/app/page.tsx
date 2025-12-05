import Link from 'next/link';
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui';

export default function Home() {
  const features = [
    {
      title: 'Key Stages 1-4',
      description:
        'Comprehensive curriculum-aligned content for primary to secondary education.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Quality Content',
      description:
        'Trusted educational materials from Oak National Academy used across the UK.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Free Resources',
      description:
        'Complete access to lessons, worksheets, and videos at no cost.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Easy Navigation',
      description:
        'Browse by subject, year group, or topic efficiently.',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  const keyStages = [
    { id: 'ks1', name: 'Key Stage 1', years: 'Years 1-2', ages: 'Ages 5-7' },
    { id: 'ks2', name: 'Key Stage 2', years: 'Years 3-6', ages: 'Ages 7-11' },
    { id: 'ks3', name: 'Key Stage 3', years: 'Years 7-9', ages: 'Ages 11-14' },
    { id: 'ks4', name: 'Key Stage 4', years: 'Years 10-11', ages: 'Ages 14-16' },
  ];

  return (
    <div className="min-h-screen bg-background-light">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Powered by Oak National Academy
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
              Master Your Curriculum with <br />
              <span className="text-primary relative">
                Infoverse
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Access high-quality curriculum-aligned lessons and resources free for everyone for the next 14 days (No credit card required).
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg" className="h-14 px-8 text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Stats/Social Proof */}
            <div className="mt-16 pt-8 border-t border-gray-200 flex justify-center gap-16">
              {[
                { label: 'Lessons', value: '100+' },
                { label: 'Subjects', value: '10+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Choose Infoverse?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We provide the tools and resources you need to succeed in your educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} hover className="border-gray-100 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Stages */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Browse by Key Stage
              </h2>
              <p className="text-lg text-gray-500 max-w-xl">
                Select your education level to find relevant materials suited to your year group.
              </p>
            </div>
            <Link href="/key-stages">
              <Button variant="outline">View All Stages</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStages.map((stage, index) => (
              <Link key={stage.id} href={`/key-stages/${stage.id}`}>
                <Card hover className="h-full group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {stage.name}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 font-medium">{stage.years}</p>
                    <p className="text-sm text-gray-400">{stage.ages}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <div className="relative rounded-3xl overflow-hidden bg-primary px-8 py-16 md:px-16 md:py-20 text-center text-white shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to transform your learning?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                Join our community of learners and educators. Sign up today for free access to all our resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button variant="secondary" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-lg hover:shadow-xl">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}