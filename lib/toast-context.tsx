"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "warning";
export type ToastPosition = "top-left" | "top-center" | "top-right";

interface ToastProps {
  id: string;
  title: string;
  description: string;
  type?: ToastType;
  position?: ToastPosition;
}

export type ShowToastProps = Omit<ToastProps, "id">;

interface ToastContextType {
  showToast: (props: ShowToastProps) => void;
  toasts: ToastProps[];
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const MAX_TOASTS = 3;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ title, description, type = "success", position = "top-center" }: ShowToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => {
      const newList = [{ id, title, description, type, position }, ...prev];
      return newList.slice(0, MAX_TOASTS);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      hideToast(id);
    }, 5000);
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, toasts, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}


export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
