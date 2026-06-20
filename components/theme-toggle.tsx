"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Labels = { light: string; dark: string; system: string };

export function ThemeToggle({ labels }: { labels: Labels }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const options = [
    { value: "light", label: labels.light, icon: Sun },
    { value: "dark", label: labels.dark, icon: Moon },
    { value: "system", label: labels.system, icon: Monitor },
  ];

  useEffect(() => setMounted(true), []);

  return (
    <div className="grid grid-cols-3 overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] text-[11px] font-bold uppercase">
      {options.map((option) => {
        const Icon = option.icon;
        const active = mounted && theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => setTheme(option.value)}
            className={`flex min-h-9 items-center justify-center gap-1 px-2 transition ${active ? "bg-[var(--accent)] text-white" : "text-[var(--muted)] hover:bg-[var(--surface-3)]"}`}
          >
            <Icon size={13} aria-hidden="true" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
