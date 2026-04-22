'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

export async function loginUser(formData: FormData) {
  const payload = await getPayload({ config: await config })

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    const cookieStore = await cookies()
    cookieStore.set('payload-token', result.token as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
    return { success: false, error: message }
  }
}
