'use client'

import { useRouter } from 'next/navigation'
import type { Persona } from '@/app/lib/personas'

const accentStyles = {
  indigo: {
    iconBg: 'bg-indigo-500/10',
    badge: 'bg-indigo-900/40 text-indigo-300 border border-indigo-500/20',
    tag: 'bg-indigo-900/30 text-indigo-300 border border-indigo-500/15',
    button: 'bg-indigo-600 hover:bg-indigo-500',
  },
  rose: {
    iconBg: 'bg-rose-500/10',
    badge: 'bg-rose-900/40 text-rose-300 border border-rose-500/20',
    tag: 'bg-rose-900/30 text-rose-300 border border-rose-500/15',
    button: 'bg-rose-600 hover:bg-rose-500',
  },
}

interface Props {
  persona: Persona
  onClose: () => void
}

export default function PersonaModal({ persona, onClose }: Props) {
  const router = useRouter()
  const s = accentStyles[persona.accent]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors text-sm"
        >
          ✕
        </button>

        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl ${s.iconBg} flex items-center justify-center text-4xl mb-5`}>
          {persona.emoji}
        </div>

        {/* Name + city */}
        <h2 className="text-2xl font-bold mb-2">{persona.name}</h2>
        <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-5 ${s.badge}`}>
          {persona.city} · {persona.cityEn}
        </span>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-5">{persona.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-7">
          {persona.tags.map((tag) => (
            <span key={tag} className={`text-xs px-3 py-1 rounded-full ${s.tag}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push(`/chat/${persona.key}`)}
          className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-colors ${s.button}`}
        >
          대화 시작하기 →
        </button>
      </div>
    </div>
  )
}
