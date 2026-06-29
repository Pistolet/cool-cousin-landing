'use client'

import { useState } from 'react'
import { personas, type PersonaKey } from '@/app/lib/personas'
import PersonaModal from './PersonaModal'

export default function HeroButtons() {
  const [active, setActive] = useState<PersonaKey | null>(null)

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-none sm:w-auto">
        <button
          onClick={() => setActive('tokyo')}
          className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/20 hover:border-indigo-400/40 hover:bg-indigo-900/40 transition-all duration-200"
        >
          <span className="text-2xl leading-none">🗼</span>
          <div className="text-left flex-1">
            <p className="text-xs text-indigo-400 font-medium mb-0.5">도쿄 · Tokyo</p>
            <p className="text-sm font-semibold">켄타와 대화하기</p>
          </div>
          <svg className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => setActive('seoul')}
          className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-rose-950/50 border border-rose-500/20 hover:border-rose-400/40 hover:bg-rose-900/40 transition-all duration-200"
        >
          <span className="text-2xl leading-none">🏙️</span>
          <div className="text-left flex-1">
            <p className="text-xs text-rose-400 font-medium mb-0.5">서울 · Seoul</p>
            <p className="text-sm font-semibold">지수와 대화하기</p>
          </div>
          <svg className="w-4 h-4 text-zinc-600 group-hover:text-rose-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {active && (
        <PersonaModal persona={personas[active]} onClose={() => setActive(null)} />
      )}
    </>
  )
}
