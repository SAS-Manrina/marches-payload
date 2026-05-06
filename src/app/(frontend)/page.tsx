import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const now = new Date().toISOString()

  const { docs: upcomingMarkets } = await payload.find({
    collection: 'markets',
    where: {
      startDate: {
        greater_than_equal: now,
      },
    },
    sort: 'startDate',
    depth: 1,
  })

  const { docs: activeOrganizations } = await payload.find({
    collection: 'organizations',
    where: {
      active: {
        equals: true,
      },
    },
    sort: 'name',
    select: { name: true },
  })

  return (
    <div className="home">
      <div className="content">
        <h1>Nos prochains marchés</h1>

        <section className="markets-list">
          {upcomingMarkets.length === 0 ? (
            <p>Aucun marché à venir pour le moment.</p>
          ) : (
            <ul>
              {upcomingMarkets.map((market) => {
                const venue = typeof market.venue === 'object' && market.venue !== null ? market.venue : null
                const start = new Date(market.startDate)
                const end = new Date(market.endDate)

                const dateLabel = market.allDay
                  ? start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                  : `${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} · ${start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} – ${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`

                return (
                  <li key={market.id} className="market-item">
                    <span className="market-date">Le {dateLabel}</span><br></br>
                    {venue && (
                      <span className="market-venue">
                        {venue.name}
                        {venue.address && `, ${venue.address}`}
                        {venue.zipCode && ` ${venue.zipCode}`}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section className="organizations-list">
          <h2>Organisations partenaires</h2>
          {activeOrganizations.length === 0 ? (
            <p>Aucune organisation partenaire pour le moment.</p>
          ) : (
            <ul>
              {activeOrganizations.map((org) => (
                <li key={org.id}>{org.name}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
