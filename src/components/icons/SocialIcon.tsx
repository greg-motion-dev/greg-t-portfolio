import type { ProfileLinkKind } from "@/constants";
import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

export interface SocialIconProps {
  readonly kind: ProfileLinkKind;
  readonly className?: string;
}

export default function SocialIcon({ kind, className }: SocialIconProps) {
  switch (kind) {
    case "github":
      return <GitHubIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
  }
}
