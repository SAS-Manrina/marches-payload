'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from './actions'

const initialState = { success: false, error: '' }

export default function RegisterForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return registerUser(formData)
    },
    initialState,
  )

  useEffect(() => {
    if (state.success) {
      router.push('/inscription-organisation')
    }
  }, [state.success, router])

  return (
    <form className="register-form" action={formAction}>
      {state.error && <p className="register-error">{state.error}</p>}

      <div className="register-row">
        <div className="register-field">
          <label htmlFor="firstName">Prénom</label>
          <input id="firstName" name="firstName" type="text" required />
        </div>
        <div className="register-field">
          <label htmlFor="lastName">Nom</label>
          <input id="lastName" name="lastName" type="text" required />
        </div>
      </div>

      <div className="register-field">
        <label htmlFor="phone">Téléphone</label>
        <input id="phone" name="phone" type="tel" />
      </div>

      <div className="register-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>

      <div className="register-field">
        <label htmlFor="password">Mot de passe</label>
        <input id="password" name="password" type="password" required minLength={8} />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? 'Création en cours…' : 'Créer mon compte'}
      </button>
    </form>
  )
}
