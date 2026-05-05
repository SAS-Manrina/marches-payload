import Link from 'next/link'
import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr">
      <body>
        <nav className="navbar">
          <Link className="navbar-login" href="/inscription">
            S'inscrire
          </Link>
          <Link className="navbar-login" href="/connexion">
            Se connecter
          </Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
