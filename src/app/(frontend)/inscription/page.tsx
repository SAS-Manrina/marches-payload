import React from 'react'
import RegisterForm from './RegisterForm'
import '../inscription.css'

export const metadata = {
  title: 'Créer un compte',
}

export default function InscriptionPage() {
  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Créer un compte</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
