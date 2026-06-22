"use client";

import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  defaultCollapsed: boolean;
  labels: {
    playoffs: string;
    hint: string;
    show: string;
    hide: string;
  };
};

export function BracketScroller({ children, defaultCollapsed, labels }: Props) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false,
    };
    scroller.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    const drag = dragRef.current;
    if (!scroller || !drag.active) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    scroller.scrollLeft = drag.scrollLeft - delta;
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    dragRef.current.active = false;
    if (scroller?.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="standard-box overflow-hidden border-t-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--nav)] px-3 py-2 text-xs text-white/85">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase">{labels.playoffs}</span>
          <span className="hidden sm:inline">{labels.hint}</span>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="min-h-8 border border-[var(--border)] bg-[var(--surface-3)] px-3 text-[11px] font-bold uppercase text-[var(--text)] hover:border-[var(--accent-2)]"
          aria-expanded={!collapsed}
        >
          {collapsed ? labels.show : labels.hide}
        </button>
      </div>

      {collapsed ? null : (
        <div
          ref={scrollerRef}
          className="bracket-drag-scroll no-scrollbar cursor-grab overflow-x-auto p-3 active:cursor-grabbing sm:p-4"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {children}
        </div>
      )}
    </div>
  );
}
