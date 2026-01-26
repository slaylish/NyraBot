import Link from 'next/link';

// Icons
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const TicketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>;
const BoltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
const DiscordIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>;

const features = [
  { icon: <ShieldIcon />, title: 'Advanced Moderation', description: 'Auto-mod, raid protection, and a complete infraction system with escalation.' },
  { icon: <TicketIcon />, title: 'Ticket System', description: 'Professional support tickets with web dashboard, transcripts, and analytics.' },
  { icon: <BoltIcon />, title: 'Instant Actions', description: 'Emergency lockdown, global slowmode, and one-click raid defense.' },
  { icon: <ChartIcon />, title: 'Real-time Analytics', description: 'Staff leaderboards, response times, and community health metrics.' },
];

const stats = [
  { value: '50K+', label: 'Servers' },
  { value: '10M+', label: 'Users Protected' },
  { value: '99.9%', label: 'Uptime' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 50,000+ Discord communities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              The Ultimate
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Discord Management</span>
              <br />
              Platform
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Moderation, support tickets, analytics, and automation — all in one powerful bot with a beautiful web dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://discord.com/oauth2/authorize?client_id=1464998515695419596&permissions=8&scope=bot%20applications.commands"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-105 transition-transform"
              >
                <DiscordIcon />
                Add to Discord
              </a>
              <Link 
                href="/dashboard"
                className="px-8 py-4 rounded-xl bg-white/10 font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-lg text-zinc-400">Powerful tools for modern Discord communities</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to level up?</h2>
            <p className="text-lg text-zinc-400 mb-8">
              Join thousands of communities using Nyra to protect and engage their members.
            </p>
            <a 
              href="https://discord.com/oauth2/authorize?client_id=1464998515695419596&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold hover:scale-105 transition-transform"
            >
              <DiscordIcon />
              Get Started Free
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#09090b]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="font-bold text-xl mb-4">Nyra</div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The all-in-one Discord bot for moderation, support, and community management.
              </p>
            </div>
            <div>
              <div className="font-semibold text-sm text-zinc-400 uppercase tracking-wider mb-4">Product</div>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/premium" className="hover:text-white transition-colors">Premium</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-sm text-zinc-400 uppercase tracking-wider mb-4">Company</div>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-sm text-zinc-400 uppercase tracking-wider mb-4">Legal</div>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 flex items-center justify-between">
            <div className="text-sm text-zinc-600">© 2025 Nyra. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="https://discord.gg/nyra" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                <DiscordIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
