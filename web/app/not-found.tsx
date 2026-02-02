export default function NotFound() {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">404</h1>
        <p className="mt-4 text-xl text-gray-400">This page has been lost in the void.</p>
        <a href="/" className="mt-8 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
          Return Home
        </a>
      </div>
    )
  }
