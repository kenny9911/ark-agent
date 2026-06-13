"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { c, font } from "@/lib/theme";
import { Btn } from "@/components/ui";

const navDefs = [
  { id: "overview", label: "Overview", icon: "◫", href: "/dashboard" },
  { id: "agents", label: "Fleet", icon: "◉", href: "/dashboard/fleet" },
  { id: "channels", label: "Channels", icon: "⌁", href: "/dashboard/channels" },
  { id: "billing", label: "Billing & usage", icon: "▤", href: "/dashboard/billing" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  function isActive(id: string): boolean {
    if (id === "overview") return pathname === "/dashboard";
    if (id === "agents") return pathname.startsWith("/dashboard/fleet");
    if (id === "channels") return pathname.startsWith("/dashboard/channels");
    if (id === "billing") return pathname.startsWith("/dashboard/billing");
    return false;
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "236px 1fr" }}>
      {/* Sidebar */}
      <div
        style={{
          borderRight: `1px solid ${c.line}`,
          background: c.panel,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "18px 20px",
            borderBottom: `1px solid ${c.line}`,
            cursor: "pointer",
            textDecoration: "none",
            color: c.text,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              background: c.lime,
              display: "grid",
              placeItems: "center",
              fontFamily: font.space,
              fontWeight: 700,
              color: c.bg,
              fontSize: 14,
            }}
          >
            A
          </div>
          <span
            style={{
              fontFamily: font.mono,
              fontSize: 13.5,
              fontWeight: 500,
              letterSpacing: ".04em",
            }}
          >
            ARK_AGENT
          </span>
        </Link>

        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${c.line}` }}>
          <div
            style={{
              fontFamily: font.mono,
              fontSize: 10.5,
              letterSpacing: ".12em",
              color: c.faint,
              marginBottom: 4,
            }}
          >
            WORKSPACE
          </div>
          <div style={{ fontSize: 14, color: c.text2 }}>Ark Industries Pte Ltd</div>
        </div>

        <div style={{ padding: "14px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navDefs.map((n) => {
            const on = isActive(n.id);
            return (
              <button
                key={n.id}
                onClick={() => router.push(n.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: on ? c.navSelected : "transparent",
                  color: on ? c.text : c.muted,
                  border: "none",
                  padding: "10px 12px",
                  fontSize: 14,
                  fontFamily: font.sans,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 12,
                    color: on ? c.lime : c.faint,
                  }}
                >
                  {n.icon}
                </span>
                {n.label}
              </button>
            );
          })}
        </div>

        <Btn
          onClick={() => router.push("/hire")}
          hoverStyle={{ borderColor: c.lime }}
          style={{
            margin: "8px 12px",
            border: `1px dashed ${c.borderStrong}`,
            background: "transparent",
            color: c.lime,
            padding: 11,
            fontFamily: font.space,
            fontWeight: 500,
            fontSize: 13.5,
            cursor: "pointer",
          }}
        >
          + Hire new agent
        </Btn>

        <div
          style={{
            marginTop: "auto",
            padding: "18px 20px",
            borderTop: `1px solid ${c.line}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: font.mono,
              fontSize: 11,
              color: c.faint,
              marginBottom: 8,
            }}
          >
            <span>CREDITS</span>
            <span style={{ color: c.text2 }}>18,420 / 30,000</span>
          </div>
          <div style={{ height: 4, background: c.line }}>
            <div style={{ height: 4, width: "61%", background: c.lime }} />
          </div>
          <div style={{ fontSize: 11.5, color: c.faint, marginTop: 8 }}>
            Resets in 17 days · <span style={{ color: c.muted }}>overage $2 / 1k</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: c.borderStrong,
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontFamily: font.space,
                fontWeight: 700,
              }}
            >
              W
            </div>
            <div style={{ fontSize: 13, color: c.text2 }}>Wei Zhang</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ minWidth: 0 }}>{children}</div>
    </div>
  );
}
