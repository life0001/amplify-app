import React from 'react'

export default function Header(props) {
  return (
    <div className="header">
      <p className="p1">
        <span>Hello, {props.yourName}!</span>
        {/* <button onClick={signOut}>Sign out</button> */}
      </p>
    </div>
  )
}
