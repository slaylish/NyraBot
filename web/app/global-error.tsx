'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-black text-white">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
            <h2 className="text-2xl font-semibold mb-2">Internal Server Error</h2>
            <p className="text-gray-400 max-w-md mb-8">Something went wrong on our end.</p>
            <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
            >
            Try again
            </button>
        </div>
      </body>
    </html>
  )
}
