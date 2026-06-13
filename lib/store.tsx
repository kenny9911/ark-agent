"use client";

/**
 * App-wide client state that must survive route changes:
 *  - language (nav switcher + payment region default)
 *  - the agent created during the hire flow (appears in the dashboard)
 *  - per-agent paused state (toggled in the fleet grid, reflected everywhere)
 *
 * Screen-local state (form fields, chat drafts, billing range, payment step…)
 * lives in the route components themselves.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { agentsData } from "@/lib/data";
import { detectLang } from "@/lib/i18n";
import type { Agent, Lang } from "@/lib/types";

interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;

  createdAgent: Agent | null;
  setCreatedAgent: (a: Agent | null) => void;

  /** Combined roster: seeded agents + the freshly hired one (if any). */
  agents: Agent[];
  getAgent: (id: string) => Agent | undefined;

  paused: Record<string, boolean>;
  togglePause: (id: string) => void;
  isPaused: (id: string) => boolean;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [createdAgent, setCreatedAgent] = useState<Agent | null>(null);
  const [paused, setPaused] = useState<Record<string, boolean>>({});

  // Default language from the browser locale, once, on mount.
  useEffect(() => {
    setLang(detectLang(typeof navigator !== "undefined" ? navigator.language : "en"));
  }, []);

  const agents = useMemo(
    () => (createdAgent ? [...agentsData, createdAgent] : agentsData),
    [createdAgent],
  );

  const getAgent = useCallback(
    (id: string) => agents.find((a) => a.id === id),
    [agents],
  );

  const togglePause = useCallback(
    (id: string) => setPaused((p) => ({ ...p, [id]: !p[id] })),
    [],
  );

  const isPaused = useCallback((id: string) => !!paused[id], [paused]);

  const value = useMemo<AppState>(
    () => ({
      lang,
      setLang,
      createdAgent,
      setCreatedAgent,
      agents,
      getAgent,
      paused,
      togglePause,
      isPaused,
    }),
    [lang, createdAgent, agents, getAgent, paused, togglePause, isPaused],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}
