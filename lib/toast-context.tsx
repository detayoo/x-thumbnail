"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastPosition = "top-left" | "top-center" | "top-right";

interface ToastProps {
  title: string;
  description: string;
  position?: ToastPosition;
}

interface ToastContextType {
  showToast: (props: ToastProps) => void;
  toast: ToastProps | null;
  isVisible: boolean;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback(({ title, description, position = "top-center" }: ToastProps) => {
    setToast({ title, description, position });
    setIsVisible(true);
    
    // Auto-hide after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, toast, isVisible, hideToast }}>
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
