'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Container, Loading, Button } from '@/components/ui';
import { usePost } from '@/lib/hooks/useContent';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { data: post, isLoading, error } = usePost(slug);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Post Not Found</h2>
          <p className="text-text-light mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container size="md">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          {' / '}
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          {' / '}
          <span className="text-text-dark font-semibold">{post.title}</span>
        </nav>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative aspect-[16/9] mb-8 rounded-2xl overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title & Meta */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-text-light">
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
            {post.author && (
              <>
                <span className="text-gray-300">|</span>
                <span>By {post.author.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Back Button */}
        <div className="flex justify-center pt-8 border-t">
          <Link href="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
