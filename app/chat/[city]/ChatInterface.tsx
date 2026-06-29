'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Persona } from '@/app/lib/personas'

interface Message {
  id: string
  role: 'persona' | 'user'
  text: string
}

const accentStyles = {
  indigo: {
    bubble: 'bg-indigo-950/60 border border-indigo-500/20 text-white',
    sendBtn: 'bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/40 disabled:text-indigo-700',
    ring: 'focus:ring-indigo-500/30',
    iconBg: 'bg-indigo-500/10',
  },
  rose: {
    bubble: 'bg-rose-950/60 border border-rose-500/20 text-white',
    sendBtn: 'bg-rose-600 hover:bg-rose-500 disabled:bg-rose-900/40 disabled:text-rose-700',
    ring: 'focus:ring-rose-500/30',
    iconBg: 'bg-rose-500/10',
  },
}

export default function ChatInterface({ persona }: { persona: Persona }) {
  const router = useRouter()
  const s = accentStyles[persona.accent]
  const bottomRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'persona', text: persona.greeting },
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text }])
    setInput('')

    // Placeholder — API 연결 전 임시 응답
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'persona',
          text: '(곧 실제 AI 응답이 연결될 예정이에요 🛠️)',
        },
      ])
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0F0F0F] text-white">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#0F0F0F]/90 backdrop-blur-md">
        <button
          onClick={() => router.push('/')}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          ←
        </button>

        <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center text-xl`}>
          {persona.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight">{persona.name}</p>
          <p className="text-xs text-zinc-500">{persona.city} · {persona.cityEn}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) =>
          msg.role === 'persona' ? (
            <div key={msg.id} className="flex items-end gap-2 max-w-xs sm:max-w-sm">
              <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center text-sm shrink-0`}>
                {persona.emoji}
              </div>
              <div className={`px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed ${s.bubble}`}>
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end">
              <div className="px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed bg-white/[0.08] border border-white/[0.08] max-w-xs sm:max-w-sm">
                {msg.text}
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/[0.06] bg-[#0F0F0F]">
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${persona.name}에게 물어보세요...`}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 outline-none"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-colors ${s.sendBtn}`}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}
