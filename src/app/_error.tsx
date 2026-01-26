'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background text-white font-sans text-center px-6">
      <h1 className="text-[10rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-red-500/20 to-transparent">500</h1>
      <h2 className="text-3xl font-bold mb-4">System Malfunction</h2>
      <p className="text-zinc-400 max-w-md mb-8">Our engines overheated. We have been notified about this crash.</p>
      
      <button onClick={() => reset()} className="px-8 py-3 rounded-full bg-white/10 font-bold hover:bg-white/20 transition-colors">
        Try Again
      </button>
    </div>
  )
}
