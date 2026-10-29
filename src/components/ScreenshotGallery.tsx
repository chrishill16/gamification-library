import type { Screenshot } from '../types/content'

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  if (screenshots.length === 0) return null

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {screenshots.map((shot) => (
        <li key={shot.id} className="overflow-hidden rounded-xl border border-border-subtle bg-surface-raised">
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-ink/5">
            <img
              src={shot.imagePath ?? '/gamification-library/placeholder-screenshot.svg'}
              alt={shot.altText}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-1 p-3 text-sm">
            <p className="font-medium text-ink">{shot.feature}</p>
            <p className="text-ink-muted">{shot.attribution}</p>
            <a href={shot.sourceUrl} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline">
              View source ↗
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
