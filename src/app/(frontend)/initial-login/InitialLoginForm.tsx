'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initialLogin } from './actions'

const initialState: { success: boolean; error?: string } = { success: false }

export default function InitialLoginForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(
    (_prev: { success: boolean; error?: string }, formData: FormData) => initialLogin(formData),
    initialState,
  )

  useEffect(() => {
    if (state.success) {
      router.push('/admin')
    }
  }, [state.success, router])

  return (
    <form className="register-form" action={formAction}>
      {state.error && <p className="register-error">{state.error}</p>}

      <div className="register-field">
        <label htmlFor="password">Mot de passe initial</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          autoFocus
        />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? 'Vérification…' : 'Accéder au panneau admin'}
      </button>
    </form>
  )
}
