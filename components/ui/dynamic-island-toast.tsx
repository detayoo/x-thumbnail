"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/lib/toast-context";
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function DynamicIslandToast() {
  const { isVisible, toast } = useToast();

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && toast && (
          <motion.div
            layout
            initial={{ 
              width: 150, 
              height: 38, 
              borderRadius: 30, 
              opacity: 0,
              scale: 0.9,
              y: -10
            }}
            animate={{ 
              width: "auto", 
              height: "auto", 
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
              width: 150, 
              height: 38, 
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
            style={{ originY: 0 }}
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
