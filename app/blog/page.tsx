import Link from 'next/link';
import { Suspense } from 'react';
import { getAllPosts, getAllTags, getAllSeries } from '@/lib/blog';
import TagFilter from '@/components/blog/tag-filter';
import SeriesFilter from '@/components/blog/series-filter';

interface BlogPageProps {
  searchParams: Promise<{ tag?: string | string[]; series?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const allSeries = getAllSeries();

  // Get selected filters from search params
  const selectedSeries = params.series || null;
  const selectedTags = Array.isArray(params.tag) ? params.tag : params.tag ? [params.tag] : [];

  // Filter posts: first by series, then by tags
  let filteredPosts = allPosts;

  // Apply series filter first
  if (selectedSeries) {
    filteredPosts = filteredPosts.filter((post) => post.frontmatter.series === selectedSeries);
  }

  // Then apply tag filter
  if (selectedTags.length > 0) {
    filteredPosts = filteredPosts.filter((post) => {
      const postTags = post.frontmatter.tags || [];
      return selectedTags.some((tag) => postTags.includes(tag));
    });
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <Suspense fallback={<div className="mb-8 h-20" />}>
        <SeriesFilter series={allSeries} />
        <TagFilter tags={allTags} />
      </Suspense>
      {filteredPosts.length === 0 ? (
        <p className="text-neutral-400">
          {selectedSeries || selectedTags.length > 0
            ? 'No posts found matching the selected filters.'
            : 'No posts yet. Check back soon!'}
        </p>
      ) : (
        <ul className="space-y-8">
          {filteredPosts.map((post) => (
            <li key={post.slug} className="border-b border-neutral-800 pb-8 last:border-b-0">
              <Link
                href={`/blog/${post.slug}`}
                className="block hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-3 mb-2">
                  <time className="text-sm text-neutral-400">
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.frontmatter.series && (
                    <>
                      <span className="text-neutral-600">•</span>
                      <span className="px-3 py-1 text-xs bg-brand-blue/20 text-brand-blue rounded-full font-medium">
                        {post.frontmatter.series}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-semibold mb-2">{post.frontmatter.title}</h2>
                {post.frontmatter.description && (
                  <p className="text-neutral-400">{post.frontmatter.description}</p>
                )}
                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-neutral-800 rounded text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
