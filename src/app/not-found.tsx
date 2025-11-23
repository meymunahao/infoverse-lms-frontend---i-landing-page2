import Link from 'next/link';
import { Container, Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="bg-background-light min-h-[60vh] flex items-center justify-center py-16">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-text-light mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                Go Home
              </Button>
            </Link>
            <Link href="/key-stages">
              <Button variant="outline" size="lg">
                Browse Key Stages
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
