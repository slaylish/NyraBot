'use client';

// Minimal Discord Markdown Parser replacement
// Since we might not want to install heavy deps, let's do a basic regex replacement for bold, italic, code, links.
// For robust Discord MD, packages like 'simple-markdown' or 'react-markdown' are best, but this needs no deps.

import React from 'react';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  if (!content) return null;

  // Split by newlines
  const lines = content.split('\n');

  return (
    <div className={cn("whitespace-pre-wrap leading-relaxed", className)}>
      {lines.map((line, i) => (
        <div key={i} className="min-h-[1.125rem]">{parseLine(line)}</div>
      ))}
    </div>
  );
}

function parseLine(text: string): React.ReactNode {
    // Very naive parser. 
    // Bold: **text**
    // Italic: *text* or _text_
    // Highlight: `text`
    // Mention: <@123> -> @User
    
    // We can use a regex loop to tokenize.
    // For now, let's just create a list of spans.
    
    // TODO: Implement robust parser for next iteration. 
    // This is a placeholder that handles basic BOLD and CODE.
    
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={index} className="bg-[#2b2d31] px-1 py-0.5 rounded text-[85%] font-mono">{part.slice(1, -1)}</code>;
        }
        return <span key={index}>{part}</span>;
    });
}
