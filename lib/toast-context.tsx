"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastProps {
  title: string;
  description: string;
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

  const showToast = useCallback(({ title, description }: ToastProps) => {
    setToast({ title, description });
    setIsVisible(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
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
