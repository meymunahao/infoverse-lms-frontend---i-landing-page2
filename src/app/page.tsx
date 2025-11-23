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
        'Access comprehensive curriculum-aligned content for all key stages from primary to secondary education.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: 'Quality Content',
      description:
        'Trusted educational materials from Oak National Academy, used by thousands of schools across the UK.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      title: 'Free Resources',
      description:
        'Complete access to lessons, worksheets, and videos at no cost. Education should be accessible to all.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
    },
    {
      title: 'Easy Navigation',
      description:
        'Browse by subject, year group, or topic. Find exactly what you need quickly and efficiently.',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
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
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background-dark via-primary to-primary-dark text-white py-24 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <p className="text-sm font-semibold">
                Powered by Oak National Academy
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
                Infoverse Digital-Ed
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 leading-relaxed">
              Access quality educational content from Oak National Academy for
              Key Stages 1-4. Learn, explore, and excel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/key-stages">
                <Button
                  variant="secondary"
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  Explore Key Stages →
                </Button>
              </Link>
              <Link href="/subjects">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-background-dark shadow-xl"
                >
                  Browse Subjects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
              Why Choose{' '}
              <span className="text-primary">Infoverse Digital-Ed</span>?
            </h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto leading-relaxed">
              Your gateway to comprehensive educational resources aligned with
              the UK curriculum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card
                  hover
                  className="h-full transform hover:-translate-y-2 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl mb-3">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-light leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Stages Overview */}
      <section className="py-20 bg-gradient-to-b from-white to-background-light">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
              Explore by{' '}
              <span className="text-primary">Key Stage</span>
            </h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto leading-relaxed">
              Select the appropriate key stage to browse curriculum-aligned
              content tailored to your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStages.map((stage, index) => (
              <Link
                key={stage.id}
                href={`/key-stages/${stage.id}`}
                className="group"
              >
                <Card
                  hover
                  className="h-full transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                >
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <svg
                        className="w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {stage.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-primary text-lg mb-2">
                      {stage.years}
                    </p>
                    <p className="text-sm text-text-light bg-primary/5 px-3 py-1 rounded-full inline-block">
                      {stage.ages}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="relative bg-gradient-to-r from-primary via-primary-dark to-primary text-white rounded-3xl p-12 md:p-16 text-center shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Start Learning?
              </h2>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100 leading-relaxed">
                Join thousands of students exploring quality educational
                resources. Start your learning journey today.
              </p>
              <Link href="/register">
                <Button
                  variant="secondary"
                  size="lg"
                  className="shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all text-lg px-10 py-4"
                >
                  Get Started Now →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
