export function FencerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield */}
      <path
        d="M 4 2 L 4 8 C 4 14 12 20 12 20 C 12 20 20 14 20 8 L 20 2 C 12 2 12 2 12 2 C 12 2 12 2 4 2 Z"
        fill="currentColor"
      />

      {/* Fencer silhouette - refined lunging position */}
      {/* Head */}
      <circle cx="10" cy="6" r="1.2" fill="white" />

      {/* Body (torso) */}
      <path
        d="M 10 7.2 L 10.5 10"
        stroke="white"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />

      {/* Back arm (bent) */}
      <path
        d="M 10.3 8 L 7.5 8.5"
        stroke="white"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />

      {/* Front arm (extended with épée) */}
      <path
        d="M 10.5 8 L 16 7"
        stroke="white"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />

      {/* Épée blade */}
      <path
        d="M 16 7 L 18.5 6.5"
        stroke="white"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Back leg (extended) */}
      <path
        d="M 10 10 L 6.5 12.5"
        stroke="white"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />

      {/* Front leg (lunging) */}
      <path
        d="M 10.5 10 L 14 13"
        stroke="white"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
