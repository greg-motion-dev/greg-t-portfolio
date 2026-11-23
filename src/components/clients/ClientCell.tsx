import type { Client } from "@/constants";

export interface ClientCellProps {
  readonly client: Client;
}

export default function ClientCell({ client }: ClientCellProps) {
  const { logo } = client;

  return (
    <li className="group/client flex h-24 w-48 shrink-0 items-center justify-center border-r border-white/10 px-6 md:h-28 md:w-56">
      {logo ? (
        <span
          role="img"
          aria-label={client.name}
          style={{
            height: `${logo.displayHeight}rem`,
            aspectRatio: `${logo.width} / ${logo.height}`,
            maskImage: `url(${logo.src})`,
            WebkitMaskImage: `url(${logo.src})`,
          }}
          className="block max-w-full bg-ink-muted transition-colors duration-300 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] group-hover/client:bg-ink motion-reduce:transition-none"
        />
      ) : (
        <span className="text-center font-mono text-xs tracking-widest text-ink-muted uppercase transition-colors duration-300 group-hover/client:text-ink motion-reduce:transition-none">
          {client.name}
        </span>
      )}
    </li>
  );
}
