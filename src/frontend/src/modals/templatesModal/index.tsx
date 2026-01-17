import { useState } from "react";
import { useParams } from "react-router-dom";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { track } from "@/customization/utils/analytics";
import useAddFlow from "@/hooks/flows/use-add-flow";
import type { Category } from "@/types/templates/types";
import type { newFlowModalPropsType } from "../../types/components";
import BaseModal from "../baseModal";
import GetStartedComponent from "./components/GetStartedComponent";
import { Nav } from "./components/navComponent";
import TemplateContentComponent from "./components/TemplateContentComponent";

export default function TemplatesModal({
  open,
  setOpen,
}: newFlowModalPropsType): JSX.Element {
  const [currentTab, setCurrentTab] = useState("get-started");
  const addFlow = useAddFlow();
  const navigate = useCustomNavigate();
  const { folderId } = useParams();

  // Fuowo-focused categories (Phase 1)
  const categories: Category[] = [
    {
      title: "Agent Templates",
      items: [
        { title: "Starter Agents", icon: "SquarePlay", id: "get-started" },
        { title: "Agent Templates", icon: "LayoutPanelTop", id: "all-templates" },
      ],
    },
    {
      title: "Use Cases",
      items: [
        {
          title: "Writing Agents",
          icon: "Newspaper",
          id: "content-generation",
        },
        { title: "QA Agents", icon: "Database", id: "q-a" },
      ],
    },
    {
      title: "Methodology",
      items: [
        { title: "Knowledge Agents", icon: "Database", id: "rag" },
        { title: "Multi-Agents Systems", icon: "Bot", id: "agents" },
      ],
    },
  ];

  return (
    <BaseModal size="templates" open={open} setOpen={setOpen} className="p-0">
      <BaseModal.Content className="flex flex-col p-0">
        <div className="flex h-full">
          <SidebarProvider width="15rem" defaultOpen={false}>
            <Nav
              categories={categories}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />

            <main className="flex flex-1 flex-col gap-4 overflow-auto p-6 md:gap-8">
              {currentTab === "get-started" ? (
                <GetStartedComponent />
              ) : (
                <TemplateContentComponent
                  currentTab={currentTab}
                  categories={categories.flatMap(
                    (category) => category.items,
                  )}
                />
              )}

              <BaseModal.Footer>
                <div className="flex w-full flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col">
                    <div className="font-semibold">
                      Create from scratch
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Begin with a fresh agent and build it step by step.
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      addFlow().then((id) => {
                        navigate(
                          `/flow/${id}${folderId ? `/folder/${folderId}` : ""}`,
                        );
                      });
                      track("New Agent Created", {
                        template: "Blank Agent",
                      });
                    }}
                    size="sm"
                    data-testid="blank-agent"
                    className="shrink-0"
                  >
                    <ForwardedIconComponent
                      name="Plus"
                      className="h-4 w-4"
                    />
                    Blank Agent
                  </Button>
                </div>
              </BaseModal.Footer>
            </main>
          </SidebarProvider>
        </div>
      </BaseModal.Content>
    </BaseModal>
  );
}