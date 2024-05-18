import React from 'react'
import { Link } from 'react-router-dom'

export default function UseLink({to, children}: {to: string; children: React.ReactNode}) {
  return (
    <div>
      <Link to={to}>
        {children}
      </Link>
    </div>
  )
}
