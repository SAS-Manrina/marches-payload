import Link from 'next/link'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import LogoutButton from './LogoutButton'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: await getHeaders() })

  return (
    <html lang="fr">
      <body>
        <nav className="navbar">
          {user ? (
            <>
              <Link className="navbar-btn" href="/compte">
                Mon compte
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link className="navbar-btn" href="/inscription">
                S'inscrire
              </Link>
              <Link className="navbar-btn" href="/connexion">
                Se connecter
              </Link>
            </>
          )}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
