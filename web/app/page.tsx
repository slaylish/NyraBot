import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            NyraBot
          </Link>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Features</Link>
            <Link href="#" className="hover:text-white transition-colors">Premium</Link>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
            Add to Discord
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              v1.0 is now live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">last</span> bot you'll ever need.
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Modular, powerful, and built for scale. Manage your community with the next generation of Discord automation.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-4 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-colors">
                View Documentation
              </button>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-black border border-white/10 p-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="relative text-center space-y-4 p-8 rounded-2xl bg-black/50 backdrop-blur border border-white/10 shadow-2xl">
               <div className="text-4xl">👋</div>
               <div className="text-xl font-medium">Welcome to the server!</div>
               <div className="text-sm text-gray-400">NyraBot just now</div>
            </div>
          </div>
        </div>
      </main>

      {/* Grid */}
      <section className="py-24 px-6 border-t border-white/5">
         <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
                { title: "Modular Core", desc: "Enable only what you need. Zero bloat." },
                { title: "Web Dashboard", desc: "Configure everything from a beautiful UI." },
                { title: "99.9% Uptime", desc: "Built on a redundant global infrastructure." }
            ].map((f, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors">
                    <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                    <p className="text-gray-400">{f.desc}</p>
                </div>
            ))}
         </div>
      </section>

       <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© 2026 NyraBot. All rights reserved.</p>
       </footer>

    </div>
  );
}
