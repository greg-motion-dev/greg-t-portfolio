export interface MailIconProps {
  readonly className?: string;
}

export default function MailIcon({ className }: MailIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="2" y="4.5" width="20" height="15" rx="1.5" />
      <path d="M2.5 5.5 12 13l9.5-7.5" />
    </svg>
  );
}
