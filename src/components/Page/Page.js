import React from 'react'

export default function Page(props) {
  return (
    <div style={{ padding: '3rem' }}>
      <h1>This is a page component</h1>
      {props.match.params.slug && (<p>
        Slug: {props.match.params.slug}
      </p>)}
    </div>
  )
}
