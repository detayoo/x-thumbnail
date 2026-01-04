import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-7">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <a
              href="mailto:teeydigba@gmail.com"
              className="text-sm text-muted-foreground underline hover:text-primary"
            >
              teeydigba@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="default"
              asChild
              className="rounded-full shadow-none"
            >
              <a
                href="https://github.com/detayoo"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </Button>
            <Button
              variant="outline"
              size="default"
              asChild
              className="rounded-full shadow-none"
            >
              <a
                href="https://linkedin.com/in/tayo-adedigba"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
            </Button>
            <Button
              variant="outline"
              size="default"
              asChild
              className="rounded-full border shadow-none"
            >
              <a
                href="https://x.com/adedigggba"
                target="_blank"
                rel="noopener noreferrer"
              >
                x
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
