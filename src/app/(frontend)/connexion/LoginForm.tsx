'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from './actions'

const initialState = { success: false, error: '' }

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return loginUser(formData)
    },
    initialState,
  )

  useEffect(() => {
    if (state.success) {
      router.push('/compte')
    }
  }, [state.success, router])

  return (
    <form className="register-form" action={formAction}>
      {state.error && <p className="register-error">{state.error}</p>}

      <div className="register-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="register-field">
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? 'Connexion en cours…' : 'Se connecter'}
      </button>
    </form>
  )
}
