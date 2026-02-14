"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChevronDown, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSub,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/content-data";
import { RequestCategoryModal } from "./request-category-modal";

export function NavigationBar() {
  const firstFiveCategories = categories.slice(0, 5);
  const remainingCategories = categories.slice(5);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tight"
          >
            avantmag
          </Link>

          <div className="flex items-center gap-3">
            <ButtonGroup>
              <Button variant="outline" asChild>
                <a href="#engineering">categories</a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="!pl-2">
                    <HugeiconsIcon
                      icon={ChevronDown}
                      strokeWidth={2}
                      className="pointer-events-none"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    {firstFiveCategories.map((category, index) => {
                      const Icon = category.icon;
                      if (category.name?.toLowerCase() === "science") {
                        return (
                          <DropdownMenuSub key={index}>
                            <DropdownMenuSubTrigger className="lowercase cursor-pointer">
                              <DropdownMenuItem key={category.id} asChild>
                                <a
                                  href={`#${category.id}`}
                                  className="lowercase"
                                >
                                  <Icon />
                                  {category.name}
                                </a>
                              </DropdownMenuItem>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Link href="https://desci.ng" target="_blank">
                                     desci NG
                                  </Link>
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        );
                      }
                      return (
                        <DropdownMenuItem key={category.id} asChild>
                          <a href={`#${category.id}`} className="lowercase">
                            <Icon />
                            {category.name}
                          </a>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                  {remainingCategories?.length > 0 && <DropdownMenuSeparator />}
                  <DropdownMenuGroup>
                    {remainingCategories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <DropdownMenuItem key={category.id} asChild>
                          <a href={`#${category.id}`} className="lowercase">
                            <Icon />
                            {category.name}
                          </a>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <RequestCategoryModal>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="lowercase cursor-pointer"
                    >
                      <HugeiconsIcon
                        icon={PlusSignIcon}
                        strokeWidth={2}
                        className="pointer-events-none"
                      />
                      Request New Category
                    </DropdownMenuItem>
                  </RequestCategoryModal>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </nav>
  );
}
