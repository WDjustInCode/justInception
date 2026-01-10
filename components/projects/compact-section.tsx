export default function CompactSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-9">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple mb-1">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-brand-yellow mb-3">
            {title}
          </h2>
        ) : null}
        <div>{children}</div>
      </div>
    </section>
  );
}

