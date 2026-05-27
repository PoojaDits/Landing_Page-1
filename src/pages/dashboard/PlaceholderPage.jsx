import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-white">{title || 'Page'}</h2>
        <p className="text-sm text-gray-400 mt-2">
          This page is coming soon.
        </p>
      </div>
    </div>
  );
}
