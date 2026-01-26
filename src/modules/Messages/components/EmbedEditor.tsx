'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { EmbedData, ActionRow, ButtonStyle } from '../types';
import { Markdown } from '@/components/ui/Markdown';

interface EmbedEditorProps {
  value: { embed: EmbedData, components: ActionRow[] };
  onChange: (val: { embed: EmbedData, components: ActionRow[] }) => void;
}

const BUTTON_STYLES: { label: string; value: ButtonStyle; color: string }[] = [
  { label: 'Primary', value: 'Primary', color: 'bg-[#5865f2]' },
  { label: 'Secondary', value: 'Secondary', color: 'bg-[#4f545c]' },
  { label: 'Success', value: 'Success', color: 'bg-[#3ba55c]' },
  { label: 'Danger', value: 'Danger', color: 'bg-[#ed4245]' },
  { label: 'Link', value: 'Link', color: 'bg-zinc-500' },
];

export function EmbedEditor({ value, onChange }: EmbedEditorProps) {
  const { embed, components } = value;
  const [mode, setMode] = useState<'visual' | 'json'>('visual');
  const [activeTab, setActiveTab] = useState<'embed' | 'components'>('embed');
  const [jsonError, setJsonError] = useState('');
  const [jsonString, setJsonString] = useState('');

  // Sync Logic
  useEffect(() => {
    if (mode === 'json') {
      setJsonString(JSON.stringify({ embed, components }, null, 2));
    }
  }, [mode]);

  const handleJsonChange = (val: string) => {
    setJsonString(val);
    try {
      const parsed = JSON.parse(val);
      onChange({ 
          embed: parsed.embed || embed, 
          components: parsed.components || components 
      });
      setJsonError('');
    } catch (e) {
      setJsonError((e as Error).message);
    }
  };

  const updateEmbed = (newEmbed: EmbedData) => onChange({ ...value, embed: newEmbed });
  const updateComponents = (newComponents: ActionRow[]) => onChange({ ...value, components: newComponents });

  // Field Logic
  const addField = () => updateEmbed({ ...embed, fields: [...embed.fields, { name: '', value: '', inline: false }] });
  const updateField = (i: number, key: string, val: any) => {
    const fields = [...embed.fields];
    // @ts-ignore
    fields[i] = { ...fields[i], [key]: val };
    updateEmbed({ ...embed, fields });
  };
  const removeField = (i: number) => updateEmbed({ ...embed, fields: embed.fields.filter((_, idx) => idx !== i) });

  // Component Logic
  const addActionRow = () => {
    if (components.length >= 5) return;
    updateComponents([...components, { type: 'ActionRow', components: [] }]);
  };
  const addButton = (rowIndex: number) => {
    const rows = [...components];
    if (rows[rowIndex].components.length >= 5) return;
    rows[rowIndex].components.push({ type: 'Button', style: 'Primary', label: 'New Button', customId: `btn_${Date.now()}` });
    updateComponents(rows);
  };
  const updateComponent = (rowIndex: number, compIndex: number, key: string, val: any) => {
     const rows = [...components];
     // @ts-ignore
     rows[rowIndex].components[compIndex] = { ...rows[rowIndex].components[compIndex], [key]: val };
     updateComponents(rows);
  };
  const removeComponent = (rowIndex: number, compIndex: number) => {
     const rows = [...components];
     rows[rowIndex].components = rows[rowIndex].components.filter((_, i) => i !== compIndex);
     updateComponents(rows);
  };
  const removeRow = (rowIndex: number) => updateComponents(components.filter((_, i) => i !== rowIndex));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Left: Editor */}
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                   <Button size="sm" variant={activeTab === 'embed' ? 'primary' : 'secondary'} onClick={() => setActiveTab('embed')} disabled={mode === 'json'}>Embed</Button>
                   <Button size="sm" variant={activeTab === 'components' ? 'primary' : 'secondary'} onClick={() => setActiveTab('components')} disabled={mode === 'json'}>Components</Button>
                </div>
                <div className="flex items-center gap-2 bg-surface rounded-lg p-1">
                   <button onClick={() => setMode('visual')} className={cn("px-3 py-1 rounded-md text-sm", mode === 'visual' ? "bg-white/10 text-white" : "text-zinc-400")}>Visual</button>
                   <button onClick={() => setMode('json')} className={cn("px-3 py-1 rounded-md text-sm", mode === 'json' ? "bg-white/10 text-white" : "text-zinc-400")}>JSON</button>
                </div>
            </div>

            <Card className="flex-1 overflow-y-auto min-h-[500px]">
                {mode === 'json' ? (
                    <div className="h-full flex flex-col">
                        <textarea 
                           className="flex-1 bg-transparent font-mono text-sm resize-none outline-none text-zinc-300"
                           value={jsonString}
                           onChange={e => handleJsonChange(e.target.value)}
                        />
                        {jsonError && <p className="text-danger text-xs mt-2">{jsonError}</p>}
                    </div>
                ) : activeTab === 'embed' ? (
                    <div className="space-y-6">
                        <div><Label>Title</Label><Input value={embed.title} onChange={e => updateEmbed({...embed, title: e.target.value})} /></div>
                        <div><Label>Description</Label><textarea className="w-full rounded-xl bg-background border border-border px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none min-h-[100px]" value={embed.description} onChange={e => updateEmbed({...embed, description: e.target.value})} /></div>
                        <div><Label>Color</Label><div className="flex gap-4 items-center"><input type="color" value={embed.color} onChange={e => updateEmbed({...embed, color: e.target.value})} className="w-12 h-10 rounded-lg cursor-pointer bg-background border border-border p-1" /><span className="text-sm text-zinc-400">{embed.color}</span></div></div>
                        <div><Label>Image URL</Label><Input value={embed.image} onChange={e => updateEmbed({...embed, image: e.target.value})} /></div>
                        <div><Label>Footer</Label><Input value={embed.footer} onChange={e => updateEmbed({...embed, footer: e.target.value})} /></div>
                        <div>
                             <div className="flex justify-between mb-4"><Label className="mb-0">Fields</Label><Button size="sm" onClick={addField}>+ Add</Button></div>
                             <div className="space-y-3">{embed.fields.map((f, i) => (
                                 <div key={i} className="p-3 rounded-xl bg-background border border-border space-y-2">
                                     <Input placeholder="Name" value={f.name} onChange={e => updateField(i, 'name', e.target.value)} />
                                     <Input placeholder="Value" value={f.value} onChange={e => updateField(i, 'value', e.target.value)} />
                                     <div className="flex justify-between items-center"><label className="text-xs text-zinc-400 flex gap-2"><input type="checkbox" checked={f.inline} onChange={e => updateField(i, 'inline', e.target.checked)} /> Inline</label><button onClick={() => removeField(i)} className="text-xs text-danger">Remove</button></div>
                                 </div>
                             ))}</div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between"><Label>Rows ({components.length}/5)</Label><Button size="sm" onClick={addActionRow} disabled={components.length >= 5}>+ Add Row</Button></div>
                        {components.map((row, rI) => (
                            <div key={rI} className="p-4 rounded-xl bg-background border border-border">
                                <div className="flex justify-between mb-3"><span className="text-xs font-bold text-zinc-400">Row {rI + 1}</span><div className="flex gap-2"><Button size="xs" onClick={() => addButton(rI)} disabled={row.components.length >= 5}>+ Button</Button><button onClick={() => removeRow(rI)} className="text-xs text-danger">Delete Row</button></div></div>
                                <div className="space-y-3">
                                    {row.components.map((comp: any, cI) => (
                                        <div key={cI} className="p-3 rounded-lg bg-surface border border-white/5 space-y-3">
                                            <div className="flex justify-between"><span className="text-xs text-zinc-500">Button {cI + 1}</span><button onClick={() => removeComponent(rI, cI)} className="text-xs text-danger">Remove</button></div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Input value={comp.label} onChange={e => updateComponent(rI, cI, 'label', e.target.value)} placeholder="Label" />
                                                <select className="bg-background rounded-lg border border-border text-sm px-2 outline-none" value={comp.style} onChange={e => updateComponent(rI, cI, 'style', e.target.value)}>
                                                    {BUTTON_STYLES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                                </select>
                                                <Input value={comp.url || ''} onChange={e => updateComponent(rI, cI, 'url', e.target.value)} placeholder="URL (Link style)" disabled={comp.style !== 'Link'} />
                                                <Input value={comp.customId || ''} onChange={e => updateComponent(rI, cI, 'customId', e.target.value)} placeholder="Custom ID" disabled={comp.style === 'Link'} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold">Preview</h2>
            <div className="bg-[#313338] rounded-md p-4 border-l-4 shadow-lg" style={{ borderColor: embed.color }}>
                {embed.title && <div className="text-base font-semibold text-white mb-2"><Markdown content={embed.title} /></div>}
                {embed.description && <div className="text-sm text-zinc-300 mb-4 whitespace-pre-wrap"><Markdown content={embed.description} /></div>}
                {embed.fields.length > 0 && (
                    <div className="grid grid-cols-12 gap-2 mb-4">
                        {embed.fields.map((f, i) => (
                            <div key={i} className={f.inline ? 'col-span-4' : 'col-span-12'}><div className="text-sm font-semibold text-white"><Markdown content={f.name} /></div><div className="text-sm text-zinc-300"><Markdown content={f.value} /></div></div>
                        ))}
                    </div>
                )}
                {embed.image && <img src={embed.image} alt="" className="rounded-md max-w-full mb-2" />}
                {embed.footer && <div className="text-xs text-zinc-400">{embed.footer}</div>}
                
                {mode !== 'json' && components.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {components.map((row, i) => (
                            <div key={i} className="flex flex-wrap gap-2">
                                {row.components.map((c: any, j) => {
                                    const styleInfo = BUTTON_STYLES.find(s => s.value === c.style);
                                    return (
                                        <div key={j} className={cn("px-4 py-2 rounded-sm text-xs font-semibold text-white cursor-not-allowed opacity-90", styleInfo?.color)}>
                                            {c.label}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
