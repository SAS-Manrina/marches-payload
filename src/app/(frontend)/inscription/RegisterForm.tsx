'use client'

import { useActionState } from 'react'
import { registerUser } from './actions'

const initialState = { success: false, error: '' }

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return registerUser(formData)
    },
    initialState,
  )

  if (state.success) {
    return (
      <div className="register-success">
        <h2>Compte créé avec succès !</h2>
        <p>Vous pouvez maintenant vous connecter.</p>
        <a href="/">Retour à l&apos;accueil</a>
      </div>
    )
  }

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
