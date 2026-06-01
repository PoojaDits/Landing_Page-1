import React from 'react'

interface PlaceholderPageProps {
  title?: string
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title = 'Page',
}) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 mt-4">This page is under development.</p>
    </div>
  )
}

export default PlaceholderPage
