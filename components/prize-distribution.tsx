import type { Dictionary, Locale } from "@/lib/i18n";
import { bingSearchUrl, money, prizeBingUrl } from "@/lib/transform";

const amounts = [42_000_000, 30_000_000, 27_000_000, 25_000_000, 21_000_000, 17_000_000, 13_000_000, 9_000_000];

export function PrizeDistribution({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  return (
    <div className="standard-box border-t-0 p-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {copy.prizes.items.map(([place, note], index) => (
          <a
            key={place}
            href={bingSearchUrl(`FIFA World Cup 2026 ${note} prize money`)}
            target="_blank"
            rel="noreferrer noopener"
            className={`block border border-[var(--border)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--accent-2)] ${index < 2 ? "bg-[linear-gradient(135deg,var(--surface-3),rgba(45,108,168,.16))]" : "bg-[var(--surface-3)]"}`}
          >
            <div className="hltv-title text-2xl text-[var(--accent)]">{place}</div>
            <div className="mt-1 text-lg font-bold">{money(amounts[index], locale)}</div>
            <div className="mt-2 text-xs text-[var(--muted)]">{note}</div>
          </a>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 border border-dashed border-[var(--border-strong)] bg-[var(--nav)] p-3 text-xs text-white/80">
        <span>{copy.prizes.note}</span>
        <a
          href={prizeBingUrl()}
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 font-bold uppercase text-[var(--accent-2)] hover:underline"
        >
          {copy.prizes.moreOnBing}
        </a>
      </div>
    </div>
  );
}
