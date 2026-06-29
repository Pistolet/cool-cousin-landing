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
    iconBg: 'bg-indigo-500/10',
    dot: 'bg-indigo-400',
  },
  rose: {
    bubble: 'bg-rose-950/60 border border-rose-500/20 text-white',
    sendBtn: 'bg-rose-600 hover:bg-rose-500 disabled:bg-rose-900/40 disabled:text-rose-700',
    iconBg: 'bg-rose-500/10',
    dot: 'bg-rose-400',
  },
}

// Render newlines in message text
function MessageText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

export default function ChatInterface({ persona }: { persona: Persona }) {
  const router = useRouter()
  const s = accentStyles[persona.accent]
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'persona', text: persona.greeting },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const hasApiRoute = persona.key === 'tokyo'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = async () => {
    const text = input.trim()
    if (!text || isTyping) return

    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text }])
    setInput('')
    setIsTyping(true)

    try {
      let reply: string

      if (hasApiRoute) {
        const res = await fetch(`/api/chat/${persona.key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        })
        const data = await res.json()
        reply = data.reply ?? '응? 뭔가 잘못됐는데, 다시 물어봐줘.'
      } else {
        // Seoul — API 연결 예정
        await new Promise((r) => setTimeout(r, 700))
        reply = '(곧 지수도 연결될 예정이에요 🛠️)'
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'persona', text: reply },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: 'persona', text: '어, 잠깐 뭔가 문제가 생겼어. 다시 물어봐줄래?' },
      ])
    } finally {
      setIsTyping(false)
      inputRef.current?.focus()
    }
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
                <MessageText text={msg.text} />
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

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div className={`w-7 h-7 rounded-lg ${s.iconBg} flex items-center justify-center text-sm shrink-0`}>
              {persona.emoji}
            </div>
            <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${s.bubble}`}>
              <div className="flex gap-1 items-center h-4">
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-bounce`} style={{ animationDelay: '0ms' }} />
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-bounce`} style={{ animationDelay: '150ms' }} />
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-bounce`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-white/[0.06] bg-[#0F0F0F]">
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder={isTyping ? `${persona.name}이(가) 입력 중...` : `${persona.name}에게 물어보세요...`}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 outline-none disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={!input.trim() || isTyping}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-colors ${s.sendBtn}`}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}
