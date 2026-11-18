import Image from "next/image";
import type { Client } from "@/constants";

export interface ClientCellProps {
  readonly client: Client;
}

export default function ClientCell({ client }: ClientCellProps) {
  return (
    <li className="flex h-28 w-48 shrink-0 items-center justify-center border-r border-white/10 px-6 md:h-32 md:w-56">
      {client.logo ? (
        <Image
          src={client.logo.src}
          alt={client.name}
          width={client.logo.width}
          height={client.logo.height}
          className="h-8 w-auto max-w-full opacity-60 grayscale transition-opacity duration-300 hover:opacity-100 motion-reduce:transition-none md:h-10"
        />
      ) : (
        <span className="text-center font-mono text-xs tracking-widest text-ink-muted uppercase">
          {client.name}
        </span>
      )}
    </li>
  );
}
