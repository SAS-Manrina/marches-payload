'use client'

import { logout } from './logout/actions'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit" className="navbar-btn">
        Se déconnecter
      </button>
    </form>
  )
}
