"use client";

/**
 * Language switch. Reads + sets the active language on the AppProvider, which
 * persists the choice to localStorage and (when signed in) to the user profile.
 * Two presentations:
 *  - compact (default): a compact dropdown with short labels for nav bars.
 *  - full: a wider dropdown with full language names for the mobile drawer.
 * Both show "short + label" in the dropdown options for consistency.
 */
import { useState, useRef, useEffect } from "react";
import { c, font } from "@/lib/theme";
import { useApp } from "@/lib/store";
import { LANGS } from "@/lib/i18n";
import { common } from "@/lib/i18n/common";

export function LanguageSwitcher({
  compact = true,
  style,
}: {
  compact?: boolean;
  style?: React.CSSProperties;
}) {
  const { lang, setLang } = useApp();
  const t = common[lang];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={t.language}
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: compact ? "6px 10px" : "10px 14px",
          background: "transparent",
          border: `1px solid ${c.border}`,
          color: c.text,
          fontFamily: font.mono,
          fontSize: compact ? 12 : 14,
          cursor: "pointer",
          minWidth: compact ? 48 : 120,
          justifyContent: "center",
        }}
      >
        <span>{compact ? currentLang.short : currentLang.label}</span>
        <span style={{ fontSize: 10, color: c.muted }}>▼</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t.language}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 4,
            background: c.panel,
            border: `1px solid ${c.border}`,
            zIndex: 50,
            minWidth: 140,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {LANGS.map((l) => {
            const selected = lang === l.code;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "10px 14px",
                  background: selected ? c.limeWash : "transparent",
                  color: selected ? c.accent : c.text,
                  border: "none",
                  borderBottom: `1px solid ${c.line}`,
                  cursor: "pointer",
                  fontFamily: font.mono,
                  fontSize: 13,
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 600, width: 28 }}>{l.short}</span>
                <span style={{ color: c.muted }}>{l.label}</span>
                {selected && <span style={{ marginLeft: "auto", color: c.lime }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
