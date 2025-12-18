import Link from "next/link";
import Image from "next/image";

const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61583371989470";

export default function Footer() {
  return (
    <footer className="border-t border-brand-blue/20">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 sm:items-start">
        <div>
          <div className="relative h-6 w-auto mb-2" style={{ width: 'auto', minWidth: '140px' }}>
            <Image
              src="/justinception_combination_mark.png"
              alt="JustInception Studio"
              width={140}
              height={24}
              className="object-contain"
            />
          </div>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex text-sm font-semibold text-brand-purple hover:text-brand-yellow transition-colors"
          >
            Facebook
          </a>
        </div>

        <div className="sm:justify-self-end">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple">
            Pages
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/" className="text-sm text-neutral-300 hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm text-neutral-300 hover:text-brand-yellow transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-neutral-300 hover:text-brand-yellow transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

        <div className="mx-auto max-w-6xl px-5 pb-10">
            <div className="h-px w-full bg-brand-blue/20" />
            <p className="mt-2 text-sm text-neutral-400">
                Copyright © 2025 JustInception Studio - All Rights Reserved.
            </p>
        </div>
    </footer>
  );
}
