import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { PatternCard } from '../components/PatternCard'
import { ImplementationCard } from '../components/ImplementationCard'
import { SearchBar } from '../components/SearchBar'
import { content } from '../lib/loadContent'

const ENTRY_POINTS = [
  {
    to: '/behaviours',
    title: 'Explore Behaviours',
    description: 'Start from a behavioural objective — Repeat, Sustain, Connect and six more — and see what might help.',
  },
  {
    to: '/mechanics',
    title: 'Explore Mechanics',
    description: 'Browse the full catalogue of gamification mechanics and adjacent engagement patterns.',
  },
  {
    to: '/examples',
    title: 'Explore Examples',
    description: 'See how real products combine patterns, and what evidence — if any — backs their outcomes.',
  },
]

export function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const featuredPatterns = content.patterns.slice(0, 3)
  const featuredImplementations = content.implementations.slice(0, 3)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate(query.trim() ? `/mechanics?q=${encodeURIComponent(query.trim())}` : '/mechanics')
  }

  return (
    <div className="space-y-16">
      <section className="space-y-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">The Gamification Library</h1>
        <p className="mx-auto max-w-2xl text-ink-muted">
          A visual, searchable reference connecting behavioural objectives to design patterns, real implementations
          and appropriately qualified evidence — for product managers and designers who want credible inspiration,
          not promises.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <SearchBar value={query} onChange={setQuery} label="Search the library" />
        </form>
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-3">
          {ENTRY_POINTS.map((entry) => (
            <Link
              key={entry.to}
              to={entry.to}
              className="block rounded-xl border border-border-subtle bg-surface-raised p-6 transition-shadow hover:shadow-md"
            >
              <h2 className="font-semibold text-ink">{entry.title}</h2>
              <p className="mt-2 text-sm text-ink-muted">{entry.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Featured patterns</h2>
          <Link to="/mechanics" className="text-sm font-medium text-accent hover:underline">
            View all mechanics →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredPatterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} view="gallery" />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Featured implementations</h2>
          <Link to="/examples" className="text-sm font-medium text-accent hover:underline">
            View all examples →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredImplementations.map((implementation) => (
            <ImplementationCard key={implementation.id} implementation={implementation} view="gallery" />
          ))}
        </div>
      </section>
    </div>
  )
}
