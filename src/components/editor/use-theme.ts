"use client";

import * as React from "react";

export type Theme = "light" | "dark";
const KEY = "x-thumbnail:theme";

function read(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(KEY, theme);
  } catch {
  }
}

export function useTheme(): [Theme, (theme: Theme) => void] {
  const theme = React.useSyncExternalStore(subscribe, read, () => "light" as Theme);
  return [theme, applyTheme];
}
