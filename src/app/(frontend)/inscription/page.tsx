import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import RegisterForm from './RegisterForm'
import '../inscription.css'

export const metadata = {
  title: 'Créer un compte',
}

export default async function InscriptionPage() {
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  if (user) {
    return (
      <div className="register-page">
        <div className="register-card">
          <h1>Vous êtes déjà connecté</h1>
          <p style={{ textAlign: 'center' }}>
            <a href="/compte">Accéder à mon compte</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Créer un compte</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
