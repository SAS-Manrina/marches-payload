'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'

export async function registerOrganization(formData: FormData) {
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (!user) {
    return { success: false, error: 'Vous devez être connecté pour inscrire une organisation.' }
  }

  const name = formData.get('name') as string
  const businessName = formData.get('businessName') as string
  const type = formData.get('type') as string
  const siret = formData.get('siret') as string
  const tva = formData.get('tva') as string
  const description = formData.get('description') as string
  const website = formData.get('website') as string
  const address1 = formData.get('address1') as string
  const address2 = formData.get('address2') as string
  const zipcode = formData.get('zipcode') as string
  const city = formData.get('city') as string
  const phone = formData.get('phone') as string
  const presence = formData.get('presence') as string
  const category = formData.getAll('category') as string[]

  try {
    await payload.create({
      collection: 'organizations',
      data: {
        name,
        businessName: businessName || undefined,
        type: type || undefined,
        siret: siret || undefined,
        tva: tva || undefined,
        description: description || undefined,
        website: website || undefined,
        address1: address1 || undefined,
        address2: address2 || undefined,
        zipcode: zipcode || undefined,
        city: city || undefined,
        phone: phone || undefined,
        presence: presence || undefined,
        category: category.length > 0 ? category : undefined,
        owner: user.id,
      },
    })
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
    return { success: false, error: message }
  }
}
