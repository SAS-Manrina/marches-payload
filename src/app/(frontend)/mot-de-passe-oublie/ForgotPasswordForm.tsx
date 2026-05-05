'use client'

import { useActionState } from 'react'
import { requestPasswordReset } from './actions'

const initialState: { success: boolean; error?: string } = { success: false }

export default function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    (_prev: { success: boolean; error?: string }, formData: FormData) =>
      requestPasswordReset(formData),
    initialState,
  )

  if (state.success) {
    return (
      <div className="register-success">
        <h2>Email envoyé</h2>
        <p>
          Si un compte existe avec cette adresse, vous recevrez un email avec les instructions pour
          réinitialiser votre mot de passe.
        </p>
        <a href="/connexion">Retour à la connexion</a>
      </div>
    )
  }

  return (
    <form className="register-form" action={formAction}>
      {state.error && <p className="register-error">{state.error}</p>}

      <div className="register-field">
        <label htmlFor="email">Adresse email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? 'Envoi en cours…' : 'Envoyer le lien de réinitialisation'}
      </button>
    </form>
  )
}
