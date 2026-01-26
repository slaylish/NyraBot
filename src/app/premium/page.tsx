'use client';
import React from 'react';
import Link from 'next/link';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'For small communities',
    features: ['Basic Moderation', 'Economy System', '7-day Logs', 'Standard Support'],
    buttonText: 'Get Started',
    buttonStyle: 'secondary' as const,
  },
  {
    name: 'Pro',
    price: '$5',
    description: 'For growing servers',
    features: ['Everything in Free', 'Unlimited Auto-Mod', '30-day Detailed Logs', 'Custom Branding', 'Priority Support', 'Custom Bot Status'],
    buttonText: 'Upgrade Now',
    buttonStyle: 'primary' as const,
    highlighted: true,
    badge: 'Most Popular',
  },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen px-6 py-32">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-[150px] opacity-60" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Go <span className="text-gradient">Premium</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Unlock higher limits, advanced automation, and priority support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-8 rounded-3xl ${tier.highlighted ? 'glass glow' : 'glass'}`}
            >
              {tier.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-bold uppercase tracking-wider">
                  {tier.badge}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
              <p className="text-sm text-zinc-500 mb-4">{tier.description}</p>
              <div className="text-4xl font-bold mb-6">
                {tier.price}<span className="text-sm font-normal text-zinc-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${tier.highlighted ? 'bg-primary/20 text-primary' : 'bg-zinc-800 text-zinc-400'}`}>
                      <CheckIcon />
                    </div>
                    <span className={tier.highlighted ? 'text-white' : 'text-zinc-400'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                tier.buttonStyle === 'primary' 
                  ? 'bg-white text-black hover:scale-105' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}>
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions?</h2>
          <p className="text-zinc-400">
            <a href="https://discord.gg/nyra" className="text-primary hover:underline">Join our Discord</a> for support and answers.
          </p>
        </div>
      </div>
    </div>
  );
}
