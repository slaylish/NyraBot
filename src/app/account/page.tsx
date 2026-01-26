'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  avatar: string;
}

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        console.error('Failed to fetch user:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'DELETE' });
    router.push('/');
  };

  const handleDeleteData = async () => {
    // TODO: Implement full data deletion
    await fetch('/api/auth/me', { method: 'DELETE' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Signed In</h1>
          <Link href="/login" className="px-6 py-3 rounded-lg bg-primary font-semibold">
            Sign in with Discord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors inline-flex items-center gap-2 mb-8">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">Account</h1>

        {/* Profile */}
        <div className="rounded-2xl bg-[#16161a] border border-white/5 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {user.avatar ? (
              <img 
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`} 
                alt={user.username}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <UserIcon />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-sm text-zinc-500">Discord ID: {user.id}</p>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="rounded-2xl bg-[#16161a] border border-white/5 p-6 mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><CreditCardIcon /> Billing</h3>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Free Plan</div>
                <div className="text-sm text-zinc-500">Basic features for small communities</div>
              </div>
              <Link href="/premium" className="px-4 py-2 rounded-lg bg-primary font-semibold text-sm">
                Upgrade
              </Link>
            </div>
          </div>
          <p className="text-xs text-zinc-600">Manage your subscription and billing details.</p>
        </div>

        {/* Actions */}
        <div className="rounded-2xl bg-[#16161a] border border-white/5 p-6 mb-6">
          <h3 className="font-bold mb-4">Actions</h3>
          <button 
            onClick={handleLogout}
            className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 hover:bg-white/[0.04] transition-colors text-left"
          >
            <LogoutIcon />
            <div>
              <div className="font-medium">Sign Out</div>
              <div className="text-sm text-zinc-500">Log out of your account</div>
            </div>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl bg-[#16161a] border border-red-500/20 p-6">
          <h3 className="font-bold mb-4 text-red-400 flex items-center gap-2"><TrashIcon /> Danger Zone</h3>
          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 hover:bg-red-500/20 transition-colors text-left"
            >
              <div>
                <div className="font-medium text-red-400">Delete All Data</div>
                <div className="text-sm text-zinc-500">Permanently delete all your data from Nyra</div>
              </div>
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-300 mb-4">
                This will permanently delete all your data including settings, logs, and preferences. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteData}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm"
                >
                  Delete Everything
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/5 text-xs text-zinc-600 flex items-center justify-between">
          <span>© 2025 Nyra</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}
