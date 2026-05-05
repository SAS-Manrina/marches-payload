'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'

export async function createParticipation(organizationId: number, marketId: number) {
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (!user) {
    return { success: false, error: 'Vous devez être connecté.' }
  }

  // Verify the user owns the organization
  const org = await payload.findByID({
    collection: 'organizations',
    id: organizationId,
    depth: 0,
  })

  if (!org || org.owner !== user.id) {
    return { success: false, error: "Vous n'êtes pas autorisé à inscrire cette organisation." }
  }

  // Verify the market exists
  const market = await payload.findByID({
    collection: 'markets',
    id: marketId,
    depth: 1,
  })

  if (!market) {
    return { success: false, error: 'Marché introuvable.' }
  }

  if (new Date(market.endDate) < new Date()) {
    return { success: false, error: 'Ce marché est déjà terminé.' }
  }

  // Check for duplicate participation
  const existing = await payload.find({
    collection: 'participations',
    where: {
      and: [
        { organization: { equals: organizationId } },
        { market: { equals: marketId } },
      ],
    },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    return { success: false, error: 'Cette organisation participe déjà à ce marché.' }
  }

  try {
    await payload.create({
      collection: 'participations',
      data: {
        organization: organizationId,
        market: marketId,
      },
    })
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
    return { success: false, error: message }
  }
}
