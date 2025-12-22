import Image from "next/image";
import Section from "./section";

const items = [
  {
    title: "JustInception Studio",
    href: "/",
    src: "/justinception-brand-card.png",
  },
  {
    title: "LOCOAL",
    href: "https://locoal.com",
    src: "/locoal-brand-card.png",
  },
  {
    title: "Azul Pool Services",
    href: "https://azulpoolservices.com",
    src: "/azul-brand-card.png",
  },
  {
    title: "Bridge Head Capital Partners",
    href: "https://bridgeheadcapitalpartners.com",
    src: "/bcp-brand-card.png",
  },
  {
    title: "The Cupcake Dream Shop",
    href: "https://thecupcakedreamshop.com",
    src: "/cupcake-brand-card.png",
  },
];

export default function Gallery() {
  return (
    <Section eyebrow="Portfolio" title="Recent Missions">
      <div className="flex flex-wrap justify-start gap-4">
        {items.map((it) => {
          const card = (
            <div className="w-[290px] md:w-[345px] rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-3 shadow-sm">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-brand-purple/20">
                <Image
                  src={it.src}
                  alt={it.title}
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-brand-yellow">{it.title}</p>
                {it.href ? (
                  <span className="text-xs text-brand-purple">Open</span>
                ) : null}
              </div>
            </div>
          );

          return it.href ? (
            <a
              key={it.title}
              href={it.href}
              target="_blank"
              rel="noopener"
              className="outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {card}
            </a>
          ) : (
            <div key={it.title}>{card}</div>
          );
        })}
      </div>
    </Section>
  );
}
