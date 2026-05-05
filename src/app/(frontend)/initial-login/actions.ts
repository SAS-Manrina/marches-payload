'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

const TEMP_ADMIN_EMAIL = 'adminVUtOim@admin.com'

export async function initialLogin(formData: FormData) {
  const password = formData.get('password') as string
  const initialPassword = process.env.INITIAL_ADMIN_PASSWORD

  if (!initialPassword) {
    return { success: false, error: 'INITIAL_ADMIN_PASSWORD is not set.' }
  }

  if (password !== initialPassword) {
    return { success: false, error: 'Mot de passe incorrect.' }
  }

  const payload = await getPayload({ config: await config })

  // Ensure the temporary admin user exists
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: TEMP_ADMIN_EMAIL } },
    limit: 1,
    depth: 0,
  })

  if (docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: TEMP_ADMIN_EMAIL,
        password: initialPassword,
        firstName: 'Admin',
        lastName: 'Initial',
        role: 'admin',
      },
    })
  }

  // Log in as the temporary admin user
  const result = await payload.login({
    collection: 'users',
    data: { email: TEMP_ADMIN_EMAIL, password: initialPassword },
  })

  const cookieStore = await cookies()
  cookieStore.set('payload-token', result.token as string, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  return { success: true }
}
