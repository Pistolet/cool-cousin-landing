export type PersonaKey = 'tokyo' | 'seoul'

export interface Persona {
  key: PersonaKey
  name: string
  city: string
  cityEn: string
  emoji: string
  accent: 'indigo' | 'rose'
  description: string
  tags: string[]
  greeting: string
}

export const personas: Record<PersonaKey, Persona> = {
  tokyo: {
    key: 'tokyo',
    name: '켄타',
    city: '도쿄',
    cityEn: 'Tokyo',
    emoji: '🗼',
    accent: 'indigo',
    description:
      '시모키타자와에서 자란 도쿄 토박이. 낮에는 레코드 가게에서 일하고, 주말엔 오래된 골목 탐험이 취미. 관광지보다 현지인만 아는 라멘집과 숨겨진 재즈바를 더 잘 알아.',
    tags: ['라멘 마니아', '레코드 수집', '오래된 골목', '재즈바'],
    greeting:
      '안녕~ 도쿄에 왔어? 잘 됐다. 내가 진짜 도쿄 구석구석 알려줄게. 어떤 동네 가볼 생각이야?',
  },
  seoul: {
    key: 'seoul',
    name: '지수',
    city: '서울',
    cityEn: 'Seoul',
    emoji: '🏙️',
    accent: 'rose',
    description:
      '성수동 토박이. 카페 창업 준비 중이고, 한남동과 연남동의 새로운 공간을 누구보다 먼저 찾아다니는 게 취미. 서울의 핫플레이스는 물론, 진짜 동네 맛집도 꿰고 있어.',
    tags: ['카페 투어', '성수동', '한남동', '새벽 야식'],
    greeting:
      '어서와, 서울은 처음이야? 아니면 또 왔어? 어떤 걸 찾는지 말해봐, 내가 딱 맞는 곳 알려줄게!',
  },
}
