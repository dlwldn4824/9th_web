import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ThemeContextValue = {
  isDark: boolean;
  toggle: () => void;
  setDark: (v: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const getInitial = () => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    } catch {
      return false;
    }
  };

  const [isDark, setIsDark] = useState<boolean>(getInitial);

  useEffect(() => {
    const root = document.documentElement; // <html>
    // 확실하게 토글
    root.classList.toggle("dark", isDark);
    // 접근성/디버깅용 보조 표식
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
    // 디버깅 로그(원하면 지워도 됨)
    // console.log("[Theme] isDark=", isDark, "html.classList=", root.className);
  }, [isDark]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      toggle: () => setIsDark((v) => !v),
      setDark: (v: boolean) => setIsDark(v),
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
