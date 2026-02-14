"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToast, type ToastPosition } from "@/lib/toast-context";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 justify-start",
  "top-center": "top-4 left-0 right-0 justify-center",
  "top-right": "top-4 right-4 justify-end",
};

const ORIGIN_MAP: Record<ToastPosition, number> = {
  "top-left": 0,
  "top-center": 0.5,
  "top-right": 1,
};

export function DynamicIslandToast() {
  const { isVisible, toast } = useToast();
  const position = toast?.position || "top-center";

  return (
    <div className={`fixed z-[100] flex pointer-events-none ${POSITION_CLASSES[position]}`}>
      <AnimatePresence mode="wait">
        {isVisible && toast && (
          <motion.div
            layout
            initial={{ 
              borderRadius: 30, 
              opacity: 0,
              scale: 0.9,
              y: -10
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
              borderRadius: 30, 
              opacity: 0,
              scale: 0.9,
              y: -10,
              transition: {
                duration: 0.2,
                ease: "easeOut"
              }
            }}
            className="bg-black text-white px-5 py-3 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden min-w-[300px]"
            style={{ 
              originY: 0,
              originX: ORIGIN_MAP[position]
            }}
          >
            <motion.div
              layout
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500 rounded-full p-1.5 flex-shrink-0 flex items-center justify-center"
            >
              <HugeiconsIcon icon={CheckmarkCircle01Icon} className="size-5 text-white" />
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
        )}
      </AnimatePresence>
    </div>
  );
}
