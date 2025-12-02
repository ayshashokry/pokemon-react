
export default function Loading({ size = 6 }: { size?: number }) {
  const w = size === 6 ? 'w-6' : size === 8 ? 'w-8' : 'w-6';
  const h = w;
  return (
    <div className={`flex items-center justify-center mt-20`}>
      <div className={`animate-spin rounded-full border-4 border-current border-t-transparent ${w} ${h}`} role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
