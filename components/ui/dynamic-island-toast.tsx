"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToast, type ToastPosition, type ToastType } from "@/lib/toast-context";
import { 
  CheckmarkCircle01Icon, 
  AlertCircleIcon, 
  InformationCircleIcon,
  CancelCircleIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-0 right-0 items-center",
  "top-right": "top-4 right-4 items-end",
};

const ORIGIN_MAP: Record<ToastPosition, number> = {
  "top-left": 0,
  "top-center": 0.5,
  "top-right": 1,
};

const TYPE_CONFIG: Record<ToastType, { icon: any; color: string; bgColor: string }> = {
  success: {
    icon: CheckmarkCircle01Icon,
    color: "text-white",
    bgColor: "bg-green-500",
  },
  error: {
    icon: CancelCircleIcon,
    color: "text-white",
    bgColor: "bg-red-500",
  },
  warning: {
    icon: AlertCircleIcon,
    color: "text-black",
    bgColor: "bg-amber-500",
  },
};

export function DynamicIslandToast() {
  const { toasts } = useToast();

  // Group toasts by position for stacking
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const pos = toast.position || "top-center";
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(toast);
    return acc;
  }, {} as Record<ToastPosition, typeof toasts>);

  return (
    <>
      {Object.entries(toastsByPosition).map(([pos, posToasts]) => (
        <div 
          key={pos}
          className={`fixed z-[100] flex flex-col gap-2 pointer-events-none ${POSITION_CLASSES[pos as ToastPosition]}`}
        >
          <AnimatePresence mode="popLayout">
            {posToasts.map((toast) => {
              const config = TYPE_CONFIG[toast.type || "success"];
              return (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ 
                    borderRadius: 30, 
                    opacity: 0,
                    scale: 0.85,
                    y: -20
                  }}
                  animate={{ 
                    borderRadius: 24, 
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                      layout: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.85,
                    y: -20,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut"
                    }
                  }}
                  className="bg-black text-white px-5 py-3 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden min-w-[300px]"
                  style={{ 
                    originY: 0,
                    originX: ORIGIN_MAP[pos as ToastPosition]
                  }}
                >
                  <motion.div
                    layout
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`${config.bgColor} rounded-full p-1.5 flex-shrink-0 flex items-center justify-center`}
                  >
                    <HugeiconsIcon icon={config.icon} className={`size-5 ${config.color}`} />
                  </motion.div>
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col min-w-0"
                  >
                    <span className="text-[15px] font-bold leading-none mb-1 tracking-tight truncate">
                      {toast.title}
                    </span>
                    <span className="text-[13px] text-white/50 font-medium leading-none truncate">
                      {toast.description}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
}
