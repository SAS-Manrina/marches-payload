import React from 'react'
import LoginForm from './LoginForm'
import '../inscription.css'

export const metadata = {
  title: 'Connexion',
}

export default function ConnexionPage() {
  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Connexion</h1>
        <LoginForm />
      </div>
    </div>
  )
}
