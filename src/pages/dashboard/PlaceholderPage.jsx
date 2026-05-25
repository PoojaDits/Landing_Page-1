import React from 'react'

export default function PlaceholderPage({ title }) {

    return <h2 className="text-2xl font-bold text-gray-900">{title || 'Page'}</h2>
}