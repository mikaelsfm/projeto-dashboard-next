import React from "react";

export function TableSkeleton() {
  return (
    <div className="w-full">
      <div className="h-12 bg-neutral-900 border-b border-neutral-800 flex items-center px-4">
        <div className="h-4 w-24 bg-neutral-700 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-neutral-700 rounded animate-pulse ml-8"></div>
        <div className="h-4 w-20 bg-neutral-700 rounded animate-pulse ml-8"></div>
        <div className="h-4 w-20 bg-neutral-700 rounded animate-pulse ml-8"></div>
      </div>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className="h-12 border-b border-neutral-800 flex items-center px-4 gap-8"
        >
          <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse"></div>
          <div className="h-4 w-10 bg-neutral-800 rounded animate-pulse"></div>
          <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}