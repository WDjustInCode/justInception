export default function Section({
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
    <section id={id} className="py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl px-5">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-brand-yellow sm:text-4xl">
            {title}
          </h2>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    );
  }
  