import { CoverGenerator } from "@/components/cover-generator";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function CoverPage() {
  return (
    <CoverGenerator
      title={
        <>
          avantmag <br />- information. in print. digitally.
        </>
      }
    />
  );
}
