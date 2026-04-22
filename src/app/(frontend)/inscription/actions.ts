'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function registerUser(formData: FormData) {
  const payload = await getPayload({ config: await config })

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    await payload.create({
      collection: 'users',
      data: {
        firstName,
        lastName,
        phone,
        email,
        password,
        role: 'member',
      },
    })
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
    return { success: false, error: message }
  }
}
