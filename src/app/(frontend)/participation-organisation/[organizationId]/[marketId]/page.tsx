import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { redirect, notFound } from 'next/navigation'
import config from '@/payload.config'
import type { Organization, Market, Venue } from '@/payload-types'
import '../../../inscription.css'
import ParticipationForm from './ParticipationForm'

export const metadata = {
  title: 'Inscription à un marché',
}

type Props = {
  params: Promise<{ organizationId: string; marketId: string }>
}

export default async function ParticipationOrganisationPage({ params }: Props) {
  const { organizationId: orgIdStr, marketId: marketIdStr } = await params
  const organizationId = Number(orgIdStr)
  const marketId = Number(marketIdStr)

  if (isNaN(organizationId) || isNaN(marketId)) notFound()

  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (!user) redirect('/connexion')

  // Check user has at least one organization
  const orgsResult = await payload.find({
    collection: 'organizations',
    where: { owner: { equals: user.id } },
    limit: 1,
    depth: 0,
  })

  if (orgsResult.totalDocs === 0) redirect('/inscription-organisation')

  // Verify the requested organization belongs to this user
  // Verify the requested organization belongs to this user
  const orgResult = await payload.find({
    collection: 'organizations',
    where: { and: [{ id: { equals: organizationId } }, { owner: { equals: user.id } }] },
    limit: 1,
    depth: 0,
  })

  if (orgResult.totalDocs === 0) notFound()
  const org = orgResult.docs[0]! as Organization

  // Load the market with its venue
  const marketResult = await payload.find({
    collection: 'markets',
    where: { id: { equals: marketId } },
    limit: 1,
    depth: 1,
  })

  if (marketResult.totalDocs === 0) notFound()
  const market = marketResult.docs[0]!

  if (!market) notFound()

  if (new Date(market.endDate) < new Date()) notFound()

  const venue = typeof market.venue === 'object' ? (market.venue as Venue) : null
  const startDate = new Date(market.startDate).toLocaleDateString('fr-FR')
  const endDate = new Date(market.endDate).toLocaleDateString('fr-FR')
  const marketLabel = [
    venue?.name,
    startDate === endDate ? startDate : `${startDate} – ${endDate}`,
  ]
    .filter(Boolean)
    .join(' — ')

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Inscription à un marché</h1>
        <p style={{ textAlign: 'center', opacity: 0.6, marginTop: 0 }}>
          Confirmez la participation de votre organisation à ce marché.
        </p>
        <ParticipationForm
          organizationId={organizationId}
          organizationName={org.name}
          marketId={marketId}
          marketLabel={marketLabel}
        />
      </div>
    </div>
  )
}
