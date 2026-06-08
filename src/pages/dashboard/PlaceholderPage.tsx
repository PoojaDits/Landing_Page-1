import React from 'react'

interface PlaceholderPageProps {
  title?: string
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title = 'Page',
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <div className="rounded-3xl bg-slate-950/90 p-8 shadow-xl shadow-black/20 border border-white/5">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400 mt-4">This page is under development.</p>
      </div>
    </div>
  )
}

export default PlaceholderPage
