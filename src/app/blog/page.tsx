'use client';

import { useState } from 'react';
import { Container, Loading, Button } from '@/components/ui';
import { BlogCard } from '@/components/blog/BlogCard';
import { usePosts } from '@/lib/hooks/useContent';

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePosts('BLOG', page, 9);

  if (isLoading && !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Error Loading Blog</h2>
          <p className="text-text-light">Unable to load blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }

  const posts = data?.posts || [];
  const pagination = data?.pagination;

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Infoverse Blog
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Insights, tips, and resources for students, parents, and educators.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  featuredImage={post.featuredImage}
                  publishedAt={post.publishedAt}
                  author={post.author}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-text-light">
                  Page {page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-semibold text-text-dark mb-2">No Posts Yet</h3>
            <p className="text-text-light">Check back soon for new content!</p>
          </div>
        )}
      </Container>
    </div>
  );
}
