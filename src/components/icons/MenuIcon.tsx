export interface MenuIconProps {
  readonly className?: string;
}

export default function MenuIcon({ className }: MenuIconProps) {
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
      <path d="M4 9h16M4 15h16" />
    </svg>
  );
}
