import React from 'react'
import InitialLoginForm from './InitialLoginForm'
import '../inscription.css'

export const metadata = {
  title: 'Accès initial',
}

export default function InitialLoginPage() {
  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Accès initial</h1>
        <p style={{ textAlign: 'center', opacity: 0.6, marginTop: 0 }}>
          Entrez le mot de passe initial pour accéder au panneau d&apos;administration.
        </p>
        <InitialLoginForm />
      </div>
    </div>
  )
}
