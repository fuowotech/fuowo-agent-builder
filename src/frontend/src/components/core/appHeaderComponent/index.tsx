import { useEffect } from "react";
import FuowoLogo from "@/assets/fuowo_logo.svg?react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CustomAccountMenu from "@/customization/components/custom-AccountMenu";
import { CustomOrgSelector } from "@/customization/components/custom-org-selector";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useTheme from "@/customization/hooks/use-custom-theme";
import FlowMenu from "./components/FlowMenu";

export default function AppHeader(): JSX.Element {
  const navigate = useCustomNavigate();
  useTheme();

  return (
    <div
      className="z-10 flex h-[64px] w-full items-center justify-between
                 border-b border-border/40 bg-background/80 backdrop-blur-md
                 px-4"
      data-testid="app-header"
    >
      {/* Left Section */}
      <div
        className="flex shrink-0 items-center gap-3"
        data-testid="header_left_section_wrapper"
      >
        <Button
          unstyled
          onClick={() => navigate("/")}
          className="flex items-center"
          data-testid="icon-home"
        >
          {/* Bigger Fuowo logo */}
          <FuowoLogo className="h-12 w-12 text-primary" />
        </Button>

        <CustomOrgSelector />
      </div>

      {/* Middle Section */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <FlowMenu />
      </div>

      {/* Right Section */}
      <div
        className="flex shrink-0 items-center gap-3"
        data-testid="header_right_section_wrapper"
      >
        <Separator
          orientation="vertical"
          className="h-7 dark:border-zinc-700"
        />
        <CustomAccountMenu />
      </div>
    </div>
  );
}