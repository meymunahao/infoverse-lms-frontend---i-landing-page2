import { Container, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'About | Infoverse Digital-Ed',
  description: 'Learn more about Infoverse Digital-Ed and our educational platform',
};

export default function AboutPage() {
  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            About Infoverse Digital-Ed
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Your gateway to quality educational resources
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-dark mb-4">
                Infoverse Digital-Ed is dedicated to providing easy access to
                high-quality educational content for students, teachers, and
                parents across the UK. We leverage the excellent resources from
                Oak National Academy to create a streamlined learning experience.
              </p>
              <p className="text-text-dark">
                Our platform makes it simple to browse and discover curriculum-aligned
                lessons, units, and subjects for Key Stages 1-4, supporting
                educational excellence for all learners.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Oak National Academy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-dark mb-4">
                Oak National Academy is a collection of high-quality lessons and
                resources covering various subjects for different year groups. All
                content is created by teachers for teachers and students.
              </p>
              <p className="text-text-dark">
                Learn more at{' '}
                <a
                  href="https://www.thenational.academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  www.thenational.academy
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-text-dark">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Browse curriculum-aligned content for Key Stages 1-4</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Access lessons, worksheets, and educational videos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Organized by subject, unit, and lesson structure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Free and accessible educational resources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>User-friendly interface designed for easy navigation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">
              Ready to Start Learning?
            </h2>
            <Link
              href="/pricing"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-button shadow-md hover:bg-primary-dark transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
