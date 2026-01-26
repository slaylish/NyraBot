import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user')?.value;

  if (!userCookie) {
    return NextResponse.json({ user: null });
  }

  try {
    const user = JSON.parse(userCookie);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('discord_token');
  cookieStore.delete('discord_user');
  return NextResponse.json({ success: true });
}
