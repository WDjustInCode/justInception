'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface TagFilterProps {
  tags: string[];
}

export default function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTags = searchParams.getAll('tag');

  const toggleTag = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentTags = params.getAll('tag');

      if (currentTags.includes(tag)) {
        // Remove tag if already selected
        params.delete('tag');
        currentTags
          .filter((t) => t !== tag)
          .forEach((t) => params.append('tag', t));
      } else {
        // Add tag if not selected
        params.append('tag', tag);
      }

      router.push(`/blog?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-neutral-400 mb-4 uppercase tracking-wide">
        Filter by Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-brand-purple text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
              aria-pressed={isSelected}
            >
              {tag}
            </button>
          );
        })}
      </div>
      {(selectedTags.length > 0 || searchParams.get('series')) && (
        <button
          onClick={() => router.push('/blog', { scroll: false })}
          className="mt-4 text-sm text-neutral-400 hover:text-neutral-300 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
