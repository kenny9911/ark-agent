/** Landing/nav copy in the three supported languages. */
import type { Lang } from "@/lib/types";

export interface Dict {
  navAgents: string;
  navHow: string;
  navEngines: string;
  navPricing: string;
  signin: string;
  hire: string;
  eyebrow: string;
  heroT1: string;
  heroT2: string;
  heroSub: string;
  cta1: string;
  cta2: string;
  heroFoot: string;
}

export const dict: Record<Lang, Dict> = {
  en: {
    navAgents: "Agents",
    navHow: "How it works",
    navEngines: "Engines",
    navPricing: "Pricing",
    signin: "Sign in",
    hire: "Hire an agent",
    eyebrow: "THE AUTONOMOUS WORKFORCE",
    heroT1: "Hire an AI employee,",
    heroT2: "not another app.",
    heroSub:
      "ArkAgent puts a real autonomous agent on a dedicated machine — selling, supporting, recruiting and writing for you around the clock. Brief it like a person. Manage it from the apps you already use.",
    cta1: "Hire your first agent",
    cta2: "See a live agent",
    heroFoot: "NO CREDIT CARD · LIVE IN UNDER 4 MINUTES · CANCEL ANYTIME",
  },
  zh: {
    navAgents: "智能员工",
    navHow: "工作原理",
    navEngines: "引擎",
    navPricing: "价格",
    signin: "登录",
    hire: "雇佣智能体",
    eyebrow: "自主智能劳动力",
    heroT1: "雇一名 AI 员工，",
    heroT2: "而不是又一个软件。",
    heroSub:
      "ArkAgent 在专属云端主机上运行真正的自主智能体 —— 7×24 小时为您销售、客服、招聘与创作。像安排员工一样下达指令，用您常用的应用随时管理。",
    cta1: "雇佣第一位智能体",
    cta2: "看智能体工作",
    heroFoot: "无需信用卡 · 4 分钟内上线 · 随时取消",
  },
  zht: {
    navAgents: "智能員工",
    navHow: "工作原理",
    navEngines: "引擎",
    navPricing: "價格",
    signin: "登入",
    hire: "僱用智能體",
    eyebrow: "自主智能勞動力",
    heroT1: "僱一名 AI 員工，",
    heroT2: "而不是又一個軟體。",
    heroSub:
      "ArkAgent 在專屬雲端主機上運行真正的自主智能體 —— 7×24 小時為您銷售、客服、招聘與創作。像安排員工一樣下達指令，用您常用的應用隨時管理。",
    cta1: "僱用第一位智能體",
    cta2: "看智能體工作",
    heroFoot: "無需信用卡 · 4 分鐘內上線 · 隨時取消",
  },
};

/** Browser-locale → default language: zh-TW/HK/MO/Hant → Traditional, other zh → Simplified, else English. */
export function detectLang(navigatorLanguage: string | undefined): Lang {
  const nl = (navigatorLanguage || "en").toLowerCase();
  if (nl.startsWith("zh")) {
    const trad =
      nl.includes("tw") || nl.includes("hk") || nl.includes("mo") || nl.includes("hant");
    return trad ? "zht" : "zh";
  }
  return "en";
}
