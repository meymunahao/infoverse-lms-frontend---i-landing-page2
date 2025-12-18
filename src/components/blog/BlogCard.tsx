'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt?: string;
  author?: {
    name: string;
  };
}

export function BlogCard({ slug, title, excerpt, featuredImage, publishedAt, author }: BlogCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${slug}`}>
      <Card hover className="h-full overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-text-light text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            {publishedAt && (
              <span>{formatDate(publishedAt)}</span>
            )}
            {author && (
              <span className="font-medium">{author.name}</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default BlogCard;
