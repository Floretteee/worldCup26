import type { LucideIcon } from "lucide-react";
import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Stat = { label: string; value: string; icon: LucideIcon };

type Props = {
  copy: Dictionary;
  title: string;
  status: string;
  date: string;
  prize: string;
  teams: number;
  location: string;
  stats: Stat[];
};

export function EventHero({ copy, title, status, date, prize, teams, location, stats }: Props) {
  return (
    <section id="top" className="overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
      <div className="relative min-h-48 overflow-hidden bg-[linear-gradient(135deg,#0b223b,#174d7d_45%,#b01f34)] p-5 text-white sm:p-7">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[38px] border-white/10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/28 to-transparent" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-24 w-24 shrink-0 place-items-center border border-white/30 bg-white/12 backdrop-blur-sm">
              <Trophy size={46} strokeWidth={1.7} />
            </div>
            <div>
              <div className="mb-2 inline-flex items-center bg-[var(--accent)] px-2 py-1 text-xs font-bold uppercase tracking-wide">{status}</div>
              <h1 className="hltv-title text-4xl leading-none sm:text-5xl">{title}</h1>
              <div className="mt-2 text-sm text-blue-50/90">{copy.hero.description}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:w-72">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const valueSize = stat.label === copy.stats.firstKickOff ? "text-base sm:text-lg" : "text-xl";
              return (
                <div key={stat.label} className="border border-white/20 bg-black/18 p-3 text-center backdrop-blur-sm">
                  <Icon className="mx-auto mb-1 text-white/80" size={17} />
                  <div className={`hltv-title ${valueSize}`}>{stat.value}</div>
                  <div className="text-[10px] uppercase text-white/65">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-y-0">
        <InfoCell icon={CalendarDays} label={copy.stats.date} value={date} />
        <InfoCell icon={Trophy} label={copy.stats.prizePool} value={prize} />
        <InfoCell icon={Users} label={copy.stats.teams} value={String(teams)} />
        <InfoCell icon={MapPin} label={copy.stats.location} value={location} />
      </div>
    </section>
  );
}

function InfoCell({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex min-h-20 items-center gap-3 p-4">
      <Icon className="text-[var(--accent-2)]" size={20} />
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase text-[var(--muted)]">{label}</div>
        <div className="truncate text-sm font-bold">{value}</div>
      </div>
    </div>
  );
}
