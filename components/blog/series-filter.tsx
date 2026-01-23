'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface SeriesFilterProps {
  series: string[];
}

export default function SeriesFilter({ series }: SeriesFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSeries = searchParams.get('series');

  const toggleSeries = useCallback(
    (seriesName: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (selectedSeries === seriesName) {
        // Remove series if already selected
        params.delete('series');
      } else {
        // Set series (only one can be selected at a time)
        params.set('series', seriesName);
      }

      router.push(`/blog?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, selectedSeries]
  );

  if (series.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-neutral-400 mb-4 uppercase tracking-wide">
        Filter by Series
      </h2>
      <div className="flex flex-wrap gap-2">
        {series.map((seriesName) => {
          const isSelected = selectedSeries === seriesName;
          return (
            <button
              key={seriesName}
              onClick={() => toggleSeries(seriesName)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-brand-blue text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
              aria-pressed={isSelected}
            >
              {seriesName}
            </button>
          );
        })}
      </div>
    </div>
  );
}
