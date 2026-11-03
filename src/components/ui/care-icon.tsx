export type CareIconName =
  | 'consultation'
  | 'family'
  | 'heart'
  | 'hearing'
  | 'screening'
  | 'gynecology'
  | 'senior'
  | 'lab'
  | 'ultrasound'
  | 'pharmacy'
  | 'vaccination'
  | 'digestive';

export function CareIcon({
  name,
  size = 28,
  className,
}: {
  name: CareIconName;
  size?: number;
  className?: string;
}) {
  const paths = {
    ultrasound: (
      <>
        <rect x="2" y="3" width="15" height="12" rx="1" />
        <path d="M5 11c2-6 6-6 9 0M7 11c1-3 3-3 5 0M8 15v4m4-4v4M5 19h10m2-12h2c4 0 4 11 1 11h-1" />
        <rect x="18" y="17" width="3" height="5" rx="1" />
      </>
    ),
    digestive: (
      <>
        <path d="M10 2v5c0 3 3 4 5 3 4-2 7 1 7 5 0 4-3 7-7 7-4 0-5-4-8-4-2 0-3 2-3 4M7 2v7c0 3 2 6 5 7" />
        <path d="M15 13c2-1 4 0 4 2" />
      </>
    ),
    consultation: (
      <>
        <path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4m4 0h4M10 12v3a5 5 0 0 0 10 0v-1" />
        <circle cx="20" cy="11" r="2" />
      </>
    ),
    family: (
      <>
        <circle cx="8" cy="7" r="3" />
        <path d="M2 21v-3a6 6 0 0 1 12 0v3" />
        <circle cx="18" cy="11" r="2" />
        <path d="M16 17a4 4 0 0 1 6 3v1" />
      </>
    ),
    heart: (
      <>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        <path d="M4 12h4l2-4 3 8 2-4h5" />
      </>
    ),
    hearing: (
      <>
        <path d="M7 9a5 5 0 0 1 10 0c0 4-4 4-4 7a3 3 0 0 1-6 0M10 9a2 2 0 0 1 4 0c0 2-3 2-3 4M20 5a9 9 0 0 1 0 8" />
      </>
    ),
    screening: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    gynecology: (
      <>
        <path d="M12 15v6m-3-3h6M8 9c-1-4-6-4-6-1 0 2 3 3 5 1m9 0c1-4 6-4 6-1 0 2-3 3-5 1M7 9c0 5 2 7 5 7s5-2 5-7M9 9c1 2 5 2 6 0" />
        <path d="M12 3v2m-4-1 1 2m7-2-1 2" />
      </>
    ),
    senior: (
      <>
        <circle cx="10" cy="5" r="3" />
        <path d="M7 5h6m-3 3-3 6 5 3-1 5m-4-8-3 8m7-11 5 3m0-1a2 2 0 0 1 4 0v9" />
      </>
    ),
    lab: (
      <>
        <path d="M8 3h8m-6 0v6l-6 10a1.4 1.4 0 0 0 1.2 2h13.6a1.4 1.4 0 0 0 1.2-2L14 9V3M7 15h10M10 18h1m3-1h1" />
      </>
    ),
    pharmacy: (
      <>
        <path
          d="m8 5 11 11a4.2 4.2 0 0 1-6 6L2 11a4.2 4.2 0 0 1 6-6Z"
          transform="translate(1 -2)"
        />
        <path d="m8 15 6-6" />
      </>
    ),
    vaccination: (
      <>
        <path d="m14 3 7 7m-8-4 5 5M4 20l3-3m-2-4 6-6 6 6-6 6-6-6Zm1-1 6 6m5-12 3-3m-2-1 4 4" />
      </>
    ),
  };
  // Keep colour local to a meaningful detail, leaving the silhouette light.
  const accents = {
    ultrasound: <path d="M7 11c1-3 3-3 5 0" className="stroke-action" />,
    digestive: <path d="M15 13c2-1 4 0 4 2" className="stroke-action" />,
    consultation: (
      <circle cx="20" cy="11" r="2" className="fill-accent stroke-muted" />
    ),
    family: (
      <circle cx="18" cy="11" r="2" className="fill-action stroke-muted" />
    ),
    heart: <path d="M4 12h4l2-4 3 8 2-4h5" className="stroke-action" />,
    hearing: (
      <path d="M10 9a2 2 0 0 1 4 0c0 2-3 2-3 4" className="stroke-action" />
    ),
    screening: <path d="m8 12 3 3 5-6" className="stroke-action" />,
    gynecology: <path d="M12 15v6m-3-3h6" className="stroke-action" />,
    senior: <path d="M16 13a2 2 0 0 1 4 0v9" className="stroke-action" />,
    lab: (
      <path
        d="M7 15h10l3 4.8a.8.8 0 0 1-.7 1.2H4.7a.8.8 0 0 1-.7-1.2Z"
        className="fill-accent-soft stroke-muted"
      />
    ),
    pharmacy: (
      <path
        d="m8 15 6-6 6 5a4.2 4.2 0 0 1-6 6Z"
        className="fill-soft stroke-action"
      />
    ),
    vaccination: (
      <path d="m6 12 6 6 3-3-6-6Z" className="fill-soft stroke-action" />
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={size >= 48 ? 0.5 : 1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g className={size >= 48 ? 'text-muted' : undefined}>{paths[name]}</g>
      {size >= 48 && accents[name]}
    </svg>
  );
}
