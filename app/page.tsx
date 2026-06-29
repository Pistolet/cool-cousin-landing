export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans">
      {/* Background ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-orange-500/8 via-rose-500/8 to-pink-500/8 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 border-b border-white/[0.05] backdrop-blur-md bg-[#0F0F0F]/75">
        <span className="text-base font-semibold tracking-tight">Cool Cousin</span>
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-100 transition-colors">
            시작하기
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-44 pb-32 px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-zinc-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI 여행 컴패니언
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 max-w-3xl">
          현지인처럼
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
            여행하는 방법
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-md mb-12 leading-relaxed">
          도쿄의 켄타, 서울의 지수 — AI 로컬 페르소나와 대화하며 진짜 현지인만 아는 경험을 즐기세요.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-none sm:w-auto">
          <button className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/20 hover:border-indigo-400/40 hover:bg-indigo-900/40 transition-all duration-200">
            <span className="text-2xl leading-none">🗼</span>
            <div className="text-left flex-1">
              <p className="text-xs text-indigo-400 font-medium mb-0.5">도쿄 · Tokyo</p>
              <p className="text-sm font-semibold">켄타와 대화하기</p>
            </div>
            <svg
              className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-rose-950/50 border border-rose-500/20 hover:border-rose-400/40 hover:bg-rose-900/40 transition-all duration-200">
            <span className="text-2xl leading-none">🏙️</span>
            <div className="text-left flex-1">
              <p className="text-xs text-rose-400 font-medium mb-0.5">서울 · Seoul</p>
              <p className="text-sm font-semibold">지수와 대화하기</p>
            </div>
            <svg
              className="w-4 h-4 text-zinc-600 group-hover:text-rose-400 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            현지 친구가 생기면 달라지는 것들
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base">가이드북엔 없는, 현지인만 아는 여행</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl mb-5">
              🧠
            </div>
            <h3 className="text-base font-semibold mb-2">AI 로컬 페르소나</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              각 도시에 실제 살고 있는 듯한 AI 친구. 그들의 취향과 일상을 바탕으로 진짜 로컬 경험을 안내해요.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-rose-500/10 flex items-center justify-center text-xl mb-5">
              📍
            </div>
            <h3 className="text-base font-semibold mb-2">현지인 추천 스팟</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              관광객으로 넘치는 명소 말고, 진짜 동네 카페, 골목 식당, 숨겨진 공원을 알려드려요.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl mb-5">
              💬
            </div>
            <h3 className="text-base font-semibold mb-2">실시간 여행 동반</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              길을 잃었을 때, 메뉴를 모를 때, 뭘 해야 할지 모를 때 — 언제든 물어보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6 text-center text-xs text-zinc-600">
        © 2026 Cool Cousin. All rights reserved.
      </footer>
    </div>
  );
}
