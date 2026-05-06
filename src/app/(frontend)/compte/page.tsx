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

  const participationsResult = organizations.length > 0
    ? await payload.find({
        collection: 'participations',
        where: {
          organization: { in: organizations.map((o) => o.id) },
        },
        depth: 2,
        sort: '-createdAt',
      })
    : { docs: [] }

  const participations = participationsResult.docs

  const participationMarketIds = participations?.map((p) => {
    return (typeof p.market === 'object' ? p.market.id : null)
  }) ?? [];


  const upcomingMarketsResult = await payload.find({
    collection: 'markets',
    where: {
      startDate: { greater_than: new Date().toISOString() },
    },
    sort: 'startDate',
    depth: 1,
  })

  const upcomingMarkets = upcomingMarketsResult.docs

  return (
    <div className="register-page">
      <div className="register-card register-card--wide">
        <h1>Prochains événements</h1>
        {upcomingMarkets.length === 0 ? (
          <p className="compte-empty">Aucun événement à venir.</p>
        ) : (
          <ul className="compte-orgs">
            {upcomingMarkets.map((market) => {
              const venue = typeof market.venue === 'object' ? market.venue : null
              const startDate = new Date(market.startDate).toLocaleDateString('fr-FR')
              const endDate = new Date(market.endDate).toLocaleDateString('fr-FR')
              const subscribed = participationMarketIds.includes(market.id);
              return (
                <li key={market.id} className="compte-org-card">
                  {venue && <div className="compte-org-name">{venue.name}</div>}
                  <div className="compte-org-meta">
                    {startDate === endDate ? startDate : `${startDate} – ${endDate}`}
                  </div>
                  {organizations.length > 0 && subscribed && (
                    <div className="compte-org-meta" style={{ marginTop: 6 }}>
                      Vous êtes inscrit.e
                    </div>
                  )}
                  {organizations.length > 0 && !subscribed && (
                    <div className="compte-org-meta" style={{ marginTop: 6 }}>
                      {organizations.map((org) => (
                        <a
                          key={org.id}
                          href={`/participation-organisation/${org.id}/${market.id}`}
                          style={{ marginRight: 8 }}
                        >
                          Inscrire {org.name}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
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
            <div className="compte-info-row">
              <dt>Validé</dt>
              <dd>{user.isVerified? 'oui':'non'}</dd>
            </div>
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
        
        <section className="compte-section">
          <div className="register-section-title">Mes participations</div>
          {participations.length === 0 ? (
            <p className="compte-empty">Aucune participation enregistrée.</p>
          ) : (
            <ul className="compte-orgs">
              {participations.map((p) => {
                const market = typeof p.market === 'object' ? p.market : null
                const venue = market && typeof market.venue === 'object' ? market.venue : null
                const org = typeof p.organization === 'object' ? p.organization : null
                return (
                  <li key={p.id} className="compte-org-card">
                    {org && <div className="compte-org-name">{org.name}</div>}
                    {market && (
                      <div className="compte-org-meta">
                        {venue ? `${venue.name} — ` : ''}
                        {new Date(market.startDate).toLocaleDateString('fr-FR')}
                        {market.startDate !== market.endDate &&
                          ` – ${new Date(market.endDate).toLocaleDateString('fr-FR')}`}
                      </div>
                    )}
                    {p.status && <div className="compte-org-meta">Statut : {p.status}</div>}
                    {p.boothLocation && (
                      <div className="compte-org-meta">Emplacement : {p.boothLocation}</div>
                    )}
                    <div className="compte-org-meta">
                      Paiement : {p.paid ? 'réglé' : 'en attente'}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
