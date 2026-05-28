type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className = "h-6 w-6" }: IconProps) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
  };

  if (name === "people") {
    return (
      <svg {...common}>
        <path d="M16 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M21 20v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "heart") {
    return (
      <svg {...common}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "map") {
    return (
      <svg {...common}>
        <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "camera") {
    return (
      <svg {...common}>
        <path d="M4 8h3l2-3h6l2 3h3v11H4V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "megaphone") {
    return (
      <svg {...common}>
        <path d="M3 11v3a2 2 0 0 0 2 2h2l3 4v-4h3l8 3V6l-8 3H5a2 2 0 0 0-2 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M13.5 8.5H15V6h-1.8C10.9 6 10 7.4 10 9.2V11H8.5v2.5H10V18h2.7v-4.5h1.9L15 11h-2.3V9.4c0-.6.3-.9.8-.9Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
