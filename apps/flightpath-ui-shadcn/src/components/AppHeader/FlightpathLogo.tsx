interface FlightpathLogoProps {
  className?: string;
}

export function FlightpathLogo({ className }: FlightpathLogoProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Drone center body - larger circle */}
      <circle cx="18" cy="18" r="3.5" fill="currentColor" />

      {/* Drone arms - top left (starting with gap from center) */}
      <line
        x1="15"
        y1="15"
        x2="10"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Drone arms - top right */}
      <line
        x1="21"
        y1="15"
        x2="26"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Drone arms - bottom left */}
      <line
        x1="15"
        y1="21"
        x2="10"
        y2="26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Drone arms - bottom right */}
      <line
        x1="21"
        y1="21"
        x2="26"
        y2="26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Propellers - top left */}
      <circle
        cx="10"
        cy="10"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Propellers - top right */}
      <circle
        cx="26"
        cy="10"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Propellers - bottom left */}
      <circle
        cx="10"
        cy="26"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Propellers - bottom right */}
      <circle
        cx="26"
        cy="26"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
