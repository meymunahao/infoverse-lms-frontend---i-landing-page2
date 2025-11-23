import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-white mt-auto">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                Infoverse Digital-Ed
              </h3>
              <p className="text-gray-300">
                Access quality educational content from Oak National Academy for
                Key Stages 1-4.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/key-stages"
                    className="text-gray-300 hover:text-secondary-light transition-colors"
                  >
                    Key Stages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/subjects"
                    className="text-gray-300 hover:text-secondary-light transition-colors"
                  >
                    Subjects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-secondary-light transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.thenational.academy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-secondary-light transition-colors"
                  >
                    Oak National Academy
                  </a>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-gray-300 hover:text-secondary-light transition-colors"
                  >
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; {currentYear} Infoverse Digital-Ed. All rights reserved.
            </p>
            <p className="mt-2 text-sm">
              Powered by{' '}
              <a
                href="https://www.thenational.academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-light hover:underline"
              >
                Oak National Academy
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
