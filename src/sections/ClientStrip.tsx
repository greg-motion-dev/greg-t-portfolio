import { clients, clientsContent } from "@/constants";
import ClientCell from "@/components/clients/ClientCell";

const trackCopies = 4;

const listClasses =
  "flex shrink-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center";

export default function ClientStrip() {
  const duplicateKeys = Array.from({ length: trackCopies - 1 }, (_, index) => `copy-${index}`);

  return (
    <section aria-labelledby="clients-title" className="pb-24 md:pb-32">
      <div className="mx-auto flex max-w-7xl flex-wrap items-baseline gap-x-3 gap-y-1 px-5 font-mono text-xs tracking-widest uppercase md:px-10">
        <h2 id="clients-title" className="text-ink">
          {clientsContent.title}
        </h2>
        <p className="text-ink-muted">{clientsContent.context}</p>
      </div>

      <div className="mt-8 overflow-hidden border-y border-white/10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
          <ul className={listClasses}>
            {clients.map((client) => (
              <ClientCell key={client.id} client={client} />
            ))}
          </ul>
          {duplicateKeys.map((copyKey) => (
            <ul key={copyKey} aria-hidden="true" className={`${listClasses} motion-reduce:hidden`}>
              {clients.map((client) => (
                <ClientCell key={`${copyKey}-${client.id}`} client={client} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
