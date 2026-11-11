"use client";

import * as React from "react";
import { toast } from "sonner";

import { site } from "@/lib/site";

const PHONE_QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(PHONE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useIsPhone() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  );
}

export function MobileNotice({ onContinue }: { onContinue: () => void }) {
  return (
    <main
      className="fixed inset-0 flex flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-10 text-center"
      style={{ background: "var(--canvas)" }}
      data-testid="mobile-notice"
    >
      <div
        aria-hidden
        className="aspect-[1200/630] w-60 rounded-xl shadow-2xl ring-1 ring-[color:var(--tint-10)]"
        style={{ background: "radial-gradient(closest-side at 50% 115%, #2054d2, transparent), #07070b" }}
      />
      <div className="flex max-w-sm flex-col gap-3">
        <h1 className="m-0 text-xl font-semibold tracking-tight text-[color:var(--foreground)]">Made for bigger screens</h1>
        <p className="m-0 text-[15px] leading-relaxed text-[color:var(--muted-foreground)]">
          x-thumbnail is a design tool with a live canvas, two side panels and keyboard shortcuts. It was built for laptops
          and desktops, where there&rsquo;s room to see your share image at full size while you edit it.
        </p>
        <p className="m-0 text-[15px] leading-relaxed text-[color:var(--muted-foreground)]">
          Thanks for stopping by. Please open this page on a computer for the full experience.
        </p>
        <p className="m-0 text-[13px] text-[color:var(--muted-foreground)]">
          Made by{" "}
          <a href={site.author.url} rel="author noopener" target="_blank" className="text-[color:var(--foreground)] underline underline-offset-2">
            {site.author.name}
          </a>
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-2">
        <button
          type="button"
          onClick={() =>
            navigator.clipboard.writeText(window.location.href).then(
              () => toast.success("Link copied", { description: "Open it on your computer." }),
              () => toast.error("Couldn't copy the link."),
            )
          }
          className="h-11 rounded-xl bg-[color:var(--accent)] text-[15px] font-medium text-white active:scale-[0.98]"
        >
          Copy link for later
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="h-11 rounded-xl text-[15px] text-[color:var(--muted-foreground)] hover:bg-[color:var(--tint-5)] active:scale-[0.98]"
        >
          Continue anyway
        </button>
      </div>
    </main>
  );
}
