import React from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
import '../inscription.css'

export const metadata = {
  title: 'Mot de passe oublié',
}

export default function MotDePasseOubliePage() {
  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Mot de passe oublié</h1>
        <p style={{ textAlign: 'center', opacity: 0.7, marginTop: 0, fontSize: '15px' }}>
          Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de
          passe.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
