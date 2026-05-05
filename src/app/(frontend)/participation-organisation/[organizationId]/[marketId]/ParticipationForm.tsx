'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createParticipation } from './actions'

type Props = {
  organizationId: number
  organizationName: string
  marketId: number
  marketLabel: string
}

export default function ParticipationForm({
  organizationId,
  organizationName,
  marketId,
  marketLabel,
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await createParticipation(organizationId, marketId)
      if (result.success) {
        router.push('/compte')
      } else {
        setError(result.error ?? 'Une erreur est survenue.')
      }
    })
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {error && <p className="register-error">{error}</p>}

      <div className="register-field">
        <label>Organisation</label>
        <input type="text" value={organizationName} readOnly disabled />
      </div>

      <div className="register-field">
        <label>Marché</label>
        <input type="text" value={marketLabel} readOnly disabled />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Inscription en cours…' : 'Confirmer la participation'}
      </button>
    </form>
  )
}
