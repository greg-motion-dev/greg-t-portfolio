export interface ArrowDownIconProps {
  readonly className?: string;
}

export default function ArrowDownIcon({ className }: ArrowDownIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 4v16M5 13l7 7 7-7" />
    </svg>
  );
}
