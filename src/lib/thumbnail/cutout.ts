export const cutoutEnabled = process.env.NEXT_PUBLIC_ENABLE_BG_REMOVAL !== "false";

type Pending = { resolve: (value: string) => void; reject: (error: Error) => void; timer: ReturnType<typeof setTimeout> };

let worker: Worker | null = null;
let sequence = 0;
const pending = new Map<number, Pending>();

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL("./cutout.worker.ts", import.meta.url), { type: "module" });
  worker.onmessage = (event: MessageEvent<{ id: number; result?: string; error?: string }>) => {
    const job = pending.get(event.data.id);
    if (!job) return;
    pending.delete(event.data.id);
    clearTimeout(job.timer);
    if (event.data.result) job.resolve(event.data.result);
    else job.reject(new Error(event.data.error ?? "Background removal failed."));
  };
  worker.onerror = (event) => {
    for (const [id, job] of pending) {
      clearTimeout(job.timer);
      job.reject(new Error(event.message || "Background removal stopped unexpectedly."));
      pending.delete(id);
    }
    worker?.terminate();
    worker = null;
  };
  return worker;
}

export function removeBackground(src: string): Promise<string> {
  if (!cutoutEnabled || typeof Worker === "undefined") return Promise.reject(new Error("Background removal is turned off."));
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("Background removal took too long. Try a smaller image."));
    }, 180_000);
    pending.set(id, { resolve, reject, timer });
    try {
      getWorker().postMessage({ id, src });
    } catch (error) {
      clearTimeout(timer);
      pending.delete(id);
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}
