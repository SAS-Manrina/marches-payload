import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import React from 'react'
import config from '@/payload.config'
import '../inscription.css'
import './compte.css'


export const metadata = {
  title: 'Mon compte',
}

export default async function ComptePage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/connexion')
  }

  const orgsResult = await payload.find({
    collection: 'organizations',
    where: {
      owner: { equals: user.id },
    },
    depth: 0,
  })

  const organizations = orgsResult.docs

  return (
    <div className="register-page">
      <div className="register-card register-card--wide">
        <h1>Mon compte</h1>

        <section className="compte-section">
          <div className="register-section-title">Informations personnelles</div>
          <dl className="compte-info">
            <div className="compte-info-row">
              <dt>Prénom</dt>
              <dd>{user.firstName}</dd>
            </div>
            <div className="compte-info-row">
              <dt>Nom</dt>
              <dd>{user.lastName}</dd>
            </div>
            <div className="compte-info-row">
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            {user.phone && (
              <div className="compte-info-row">
                <dt>Téléphone</dt>
                <dd>{user.phone}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className="compte-section">
          <div className="register-section-title">Mes organisations</div>
          {organizations.length === 0 ? (
            <p className="compte-empty">
              Aucune organisation liée à votre compte.{' '}
              <a href="/inscription-organisation">Inscrire une organisation</a>
            </p>
          ) : (
            <ul className="compte-orgs">
              {organizations.map((org) => (
                <li key={org.id} className="compte-org-card">
                  <div className="compte-org-name">{org.name}</div>
                  {org.businessName && (
                    <div className="compte-org-meta">{org.businessName}</div>
                  )}
                  {org.city && (
                    <div className="compte-org-meta">{org.city}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
