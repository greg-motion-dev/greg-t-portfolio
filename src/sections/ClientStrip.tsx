import { clients } from "@/constants";
import { getUi } from "@/i18n/getUi";
import ClientCell from "@/components/clients/ClientCell";
import ClientMarquee from "@/components/clients/ClientMarquee";

const trackCopies = 4;

const listClasses =
  "flex shrink-0 motion-reduce:mx-auto motion-reduce:w-full motion-reduce:max-w-[70rem] motion-reduce:flex-wrap motion-reduce:justify-center min-[98rem]:motion-reduce:max-w-[98rem]";

export default async function ClientStrip() {
  const ui = await getUi();
  const duplicateKeys = Array.from({ length: trackCopies - 1 }, (_, index) => `copy-${index}`);

  return (
    <section aria-labelledby="clients-title" className="pt-4 md:pt-8">
      <div className="mx-auto max-w-frame px-5 md:px-10">
        <h2 id="clients-title" className="font-mono text-xs tracking-widest text-ink-muted uppercase">
          {ui.clients.title}
        </h2>
      </div>

      <ClientMarquee copies={trackCopies}>
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
      </ClientMarquee>
    </section>
  );
}
