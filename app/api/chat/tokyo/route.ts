import { NextRequest, NextResponse } from 'next/server'

interface PlaceResult {
  displayName?: { text: string }
  formattedAddress?: string
  rating?: number
  userRatingCount?: number
}

// Keywords that signal a place recommendation request
const PLACE_KEYWORDS = [
  '카페', '커피', '라멘', '라면', '스시', '초밥', '이자카야', '술집', '바',
  '맛집', '식당', '레스토랑', '우동', '소바', '돈카츠', '덴뿌라', '야키토리',
  '오코노미야키', '타코야키', '공원', '온천', '료칸', '쇼핑', '백화점', '서점',
]

function extractPlaceQuery(message: string): string | null {
  if (PLACE_KEYWORDS.some((kw) => message.includes(kw))) return message

  // "어디 가면 좋아?" 류의 범용 추천 요청
  if (/추천|어디|가볼|알려줘/.test(message) && /먹|마시|가고|놀|관광|구경/.test(message)) {
    return message
  }

  return null
}

async function searchPlaces(query: string): Promise<PlaceResult[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) throw new Error('GOOGLE_PLACES_API_KEY not set')

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.userRatingCount',
    },
    body: JSON.stringify({
      textQuery: `도쿄 ${query}`,
      languageCode: 'ko',
      maxResultCount: 3,
      locationBias: {
        circle: {
          center: { latitude: 35.6762, longitude: 139.6503 },
          radius: 30000,
        },
      },
    }),
  })

  if (!res.ok) throw new Error(`Places API ${res.status}`)

  const data = await res.json()
  return (data.places ?? []) as PlaceResult[]
}

const INTROS = [
  '아, 그거라면 딱 알지~ 내가 자주 가는 곳들 알려줄게 👇',
  '오케이~ 내 취향대로 골라봤어. 한번 봐봐 👇',
  'ㅋㅋ 마침 잘 알지! 이런 데 어때? 👇',
]

const OUTROS = [
  '어떤 곳 마음에 들어? 더 자세히 알려줄 수 있어~',
  '가고 싶은 데 있으면 말해줘, 가는 방법이나 뭘 주문할지도 알려줄게.',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function formatKentaReply(places: PlaceResult[], query: string): string {
  if (places.length === 0) {
    return `음... ${query} 관련해서 딱 떠오르는 곳이 없네. 동네나 분위기 같은 거 좀 더 알려줄래?`
  }

  const lines = places.map((p, i) => {
    const name = p.displayName?.text ?? '이름 없음'
    const rating = p.rating != null ? `⭐ ${p.rating.toFixed(1)}` : ''
    const count = p.userRatingCount != null ? ` (${p.userRatingCount.toLocaleString()}명)` : ''
    const address = (p.formattedAddress ?? '').replace('일본 〒', '').replace(/〒\d{3}-\d{4} /, '').trim()

    return [`${i + 1}. ${name}`, rating + count, `📍 ${address}`]
      .filter(Boolean)
      .join('\n')
  })

  return [pick(INTROS), '', ...lines.join('\n\n').split('\n'), '', pick(OUTROS)].join('\n')
}

const FALLBACKS = [
  '음, 좀 더 구체적으로 말해줄래? 어떤 동네인지, 어떤 분위기 찾는지 알면 딱 맞는 곳 알려줄 수 있어.',
  '그거 나도 궁금하네~ 카페야? 식당이야? 아니면 딴 거 찾아?',
  '오케이, 근데 조금만 더 알려줘. 시부야? 신주쿠? 어디 근처야?',
]

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    const placeQuery = extractPlaceQuery(message as string)

    if (placeQuery) {
      const places = await searchPlaces(placeQuery)
      return NextResponse.json({ reply: formatKentaReply(places, placeQuery) })
    }

    return NextResponse.json({ reply: pick(FALLBACKS) })
  } catch (err) {
    console.error('[/api/chat/tokyo]', err)
    return NextResponse.json(
      { reply: '어, 잠깐 뭔가 문제가 생겼어. 잠깐 있다가 다시 물어봐줄래?' },
      { status: 500 }
    )
  }
}
