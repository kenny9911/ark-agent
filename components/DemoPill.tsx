"use client";

/**
 * Fixed bottom navigator that jumps between prototype screens — mirrors the
 * "pill v2" in the design source. Active state is derived from the pathname.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { c, font } from "@/lib/theme";

interface PillDef {
  label: string;
  href: string;
  active: (path: string) => boolean;
}

const PILLS: PillDef[] = [
  { label: "LANDING", href: "/", active: (p) => p === "/" },
  { label: "SIGN IN", href: "/auth", active: (p) => p.startsWith("/auth") },
  { label: "HIRE", href: "/hire", active: (p) => p.startsWith("/hire") },
  {
    label: "DASHBOARD",
    href: "/dashboard",
    active: (p) => p === "/dashboard" || p.startsWith("/dashboard/channels"),
  },
  {
    label: "FLEET",
    href: "/dashboard/fleet",
    active: (p) => p.startsWith("/dashboard/fleet"),
  },
  {
    label: "BILLING",
    href: "/dashboard/billing",
    active: (p) => p.startsWith("/dashboard/billing"),
  },
  { label: "PAYMENT", href: "/payment", active: (p) => p.startsWith("/payment") },
  {
    label: "DIRECTIONS",
    href: "/directions",
    active: (p) => p.startsWith("/directions"),
  },
];

export function DemoPill() {
  const pathname = usePathname() || "/";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99,
        display: "flex",
        gap: 2,
        background: "rgba(14,17,22,.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${c.borderStrong}`,
        padding: 4,
        boxShadow: "0 8px 28px rgba(0,0,0,.5)",
        maxWidth: "calc(100vw - 24px)",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {PILLS.map((p) => {
        const on = p.active(pathname);
        return (
          <Link
            key={p.label}
            href={p.href}
            style={{
              background: on ? c.lime : "transparent",
              color: on ? c.bg : c.muted,
              border: "none",
              padding: "7px 14px",
              fontFamily: font.mono,
              fontSize: 11,
              letterSpacing: ".04em",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            {p.label}
          </Link>
        );
      })}
    </div>
  );
}
