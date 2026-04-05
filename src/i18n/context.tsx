import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { fr } from "./fr";
import { ht } from "./ht";
import { en } from "./en";

export type Lang = "FR" | "HT" | "EN";

const dictionaries: Record<Lang, Record<string, any>> = { FR: fr, HT: ht, EN: en };

function getNestedValue(obj: Record<string, any>, path: string): string {
  const keys = path.split(".");
  let current: any = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = current[key];
  }
  return typeof current === "string" ? current : path;
}

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("ihsi-lang");
    return (stored === "FR" || stored === "HT" || stored === "EN") ? stored : "FR";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("ihsi-lang", l);
  }, []);

  const t = useCallback((key: string): string => {
    const value = getNestedValue(dictionaries[lang], key);
    if (value === key && lang !== "FR") {
      // fallback to FR
      return getNestedValue(dictionaries.FR, key);
    }
    return value;
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === "FR" ? "fr" : lang === "HT" ? "ht" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
