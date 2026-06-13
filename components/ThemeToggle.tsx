"use client";

/**
 * Light/dark theme switch. Reads + flips the theme on the AppProvider, which
 * persists it to localStorage and sets <html data-theme>. Two presentations:
 *  - compact (default): icon-only square button for nav bars.
 *  - full: icon + label row for the mobile drawer.
 */
import { c, font } from "@/lib/theme";
import { useApp } from "@/lib/store";

export function ThemeToggle({
  compact = true,
  style,
}: {
  compact?: boolean;
  style?: React.CSSProperties;
}) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";
  const icon = isDark ? "☾" : "☀";
  const aria = `Switch to ${isDark ? "light" : "dark"} mode`;

  if (compact) {
    return (
      <button
        aria-label={aria}
        title={aria}
        onClick={toggleTheme}
        style={{
          width: 34,
          height: 30,
          display: "grid",
          placeItems: "center",
          background: "transparent",
          border: `1px solid ${c.border}`,
          color: c.text2,
          fontFamily: font.mono,
          fontSize: 14,
          cursor: "pointer",
          ...style,
        }}
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      aria-label={aria}
      onClick={toggleTheme}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "transparent",
        border: `1px solid ${c.border}`,
        color: c.text,
        padding: "13px 14px",
        fontFamily: font.sans,
        fontSize: 15,
        cursor: "pointer",
        ...style,
      }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
