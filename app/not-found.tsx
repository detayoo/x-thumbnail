"use client";

import { Button } from "@/components/ui/button";
import { Home } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <motion.h1
              className="font-mono text-[clamp(6rem,20vw,12rem)] font-bold leading-none tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              404
            </motion.h1>
          </div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Page Not Found
            </h2>
            <p className="mx-auto max-w-md text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <HugeiconsIcon icon={Home} className="size-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <motion.p
            className="mt-12 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Error Code: 404 • Page Not Found
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}