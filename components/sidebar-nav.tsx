const items = [
  ["Prize distribution", "#prizes"],
  ["Teams attending", "#teams"],
  ["Formats", "#formats"],
  ["Event data", "#event-data"],
  ["Host stadiums", "#stadiums"],
  ["Brackets", "#brackets"],
  ["Group stage", "#groups"],
];

export function SidebarNav() {
  return (
    <nav aria-label="Event sections" className="space-y-1">
      <div className="hltv-title mb-2 border-b border-[var(--border)] pb-2 text-sm uppercase">Sections</div>
      {items.map(([label, href]) => (
        <a key={href} href={href} className="block border border-transparent px-2 py-2 text-sm font-bold text-[var(--muted)] hover:border-[var(--border)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]">
          {label}
        </a>
      ))}
    </nav>
  );
}
