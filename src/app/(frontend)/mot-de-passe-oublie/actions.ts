'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function requestPasswordReset(formData: FormData) {
  const payload = await getPayload({ config: await config })
  const email = formData.get('email') as string

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: { email },
      disableEmail: true,
    })

    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
    return { success: false, error: message }
  }
}
