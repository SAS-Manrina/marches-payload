import React from 'react'
import OrganizationForm from './OrganizationForm'
import '../inscription.css'

export const metadata = {
  title: 'Inscrire mon organisation',
}

export default function InscriptionOrganizationPage() {
  return (
    <div className="register-page">
      <div className="register-card register-card--wide">
        <h1>Inscrire mon organisation</h1>
        <OrganizationForm />
      </div>
    </div>
  )
}
