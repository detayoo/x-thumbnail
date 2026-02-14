"use client";

import { HeroSection } from "./hero-section";
import { NavigationBar } from "./navigation-bar";
import { EnhancedAside } from "./enhanced-aside";
import { FeaturedSection } from "./featured-section";
import { StatsSection } from "./stats-section";

export function Home() {
  return (
    <div className="min-h-screen">
      <NavigationBar />

      <HeroSection />

      <footer className="py-8 border-t border-border">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} avantmag.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
