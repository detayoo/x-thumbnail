import { env, pipeline } from "@huggingface/transformers";

env.allowLocalModels = false;

type Segmenter = (input: string) => Promise<{ toBlob: (type?: string) => Promise<Blob> }>;

let segmenter: Promise<Segmenter> | null = null;

function load(): Promise<Segmenter> {
  segmenter ??= pipeline("background-removal", "Xenova/modnet") as unknown as Promise<Segmenter>;
  return segmenter;
}

function toDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

self.onmessage = async (event: MessageEvent<{ id: number; src: string }>) => {
  const { id, src } = event.data;
  try {
    const run = await load();
    const output = await run(src);
    const blob = await output.toBlob("image/png");
    self.postMessage({ id, result: await toDataUrl(blob) });
  } catch (error) {
    segmenter = null;
    self.postMessage({ id, error: error instanceof Error ? error.message : String(error) });
  }
};
