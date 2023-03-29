import React from 'react'

export default function Header({signOut, user}) {
  return (
    <div className="header">
      <p className="p1">
        <span>Hello {user.username}! 这里是pwfGPT😄</span>
        <button onClick={signOut}>Sign out</button>
      </p>
    </div>
  )
}
