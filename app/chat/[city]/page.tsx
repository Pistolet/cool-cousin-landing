import { notFound } from 'next/navigation'
import { personas, type PersonaKey } from '@/app/lib/personas'
import ChatInterface from './ChatInterface'

export default async function ChatPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params

  const persona = personas[city as PersonaKey]
  if (!persona) notFound()

  return <ChatInterface persona={persona} />
}
