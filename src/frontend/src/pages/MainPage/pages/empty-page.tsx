import logoDarkPng from "@/assets/fuowo_logo.svg";
import logoLightPng from "@/assets/fuowo_logo.svg";
import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import CardsWrapComponent from "@/components/core/cardsWrapComponent";
import { Button } from "@/components/ui/button";
import { DotBackgroundDemo } from "@/components/ui/dot-background";
import { useGetUserData, useUpdateUser } from "@/controllers/API/queries/auth";
import useAuthStore from "@/stores/authStore";
import { useFolderStore } from "@/stores/foldersStore";
import useFileDrop from "../hooks/use-on-file-drop";
import { useShallow } from "zustand/react/shallow";

const EMPTY_PAGE_TITLE =
  "Build, collaborate, and deploy AI agents together";

const EMPTY_PAGE_DESCRIPTION =
  "Fuowo Agent Builder is a collaborative builder for founders, teams, and creators.";

const EMPTY_PAGE_CREATE_FIRST_FLOW_BUTTON_TEXT =
  "Create your first agent";

const EMPTY_PAGE_DRAG_AND_DROP_TEXT =
  "Already have an agent? Import using drag and drop.";

const EMPTY_PAGE_FOLDER_DESCRIPTION = "Empty folder";

export const EmptyPageCommunity = ({
  setOpenModal,
}: {
  setOpenModal: (open: boolean) => void;
}) => {
  const handleFileDrop = useFileDrop(undefined);
  const folders = useFolderStore((state) => state.folders);
  const userData = useAuthStore(useShallow((state) => state.userData));
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: mutateLoggedUser } = useGetUserData();

  return (
    <DotBackgroundDemo>
      <CardsWrapComponent
        dragMessage="Drop your flows or components here"
        onFileDrop={handleFileDrop}
      >
        <div className="h-full w-full bg-background">
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-4">
            
            {/* Logo */}
            <div className="flex flex-col items-center">
              <div className="dark:hidden mb-4">
                <img
                  src={logoLightPng}
                  alt="Fuowo Logo"
                  className="h-24 pointer-events-none select-none"
                />
              </div>
              <div className="hidden dark:block mb-4">
                <img
                  src={logoDarkPng}
                  alt="Fuowo Logo"
                  className="h-24 pointer-events-none select-none"
                />
              </div>

              {/* Title */}
              <h1
                data-testid="mainpage_title"
                className="text-center font-chivo text-2xl sm:text-3xl font-semibold leading-tight text-foreground"
              >
                {EMPTY_PAGE_TITLE}
              </h1>

              {/* Description */}
              <p
                data-testid="empty_page_description"
                className="mt-2 max-w-xl text-center text-base text-secondary-foreground"
              >
                {folders?.length > 1
                  ? EMPTY_PAGE_FOLDER_DESCRIPTION
                  : EMPTY_PAGE_DESCRIPTION}
              </p>
            </div>

            {/* CTA */}
            <Button
              onClick={() => setOpenModal(true)}
              id="new-project-btn"
              data-testid="new_project_btn_empty_page"
              className="
                mt-6
                h-12
                px-6
                rounded-xl
                font-semibold
                text-white
                shadow-lg
                bg-gradient-to-r
                from-[#7C5CFF]
                to-[#9B7CFF]
                hover:opacity-90
                transition-all
              "
            >
              <ForwardedIconComponent
                name="Plus"
                aria-hidden="true"
                className="mr-2 h-4 w-4"
              />
              {EMPTY_PAGE_CREATE_FIRST_FLOW_BUTTON_TEXT}
            </Button>

          </div>
        </div>

        {/* Drag & drop hint */}
        <p
          data-testid="empty_page_drag_and_drop_text"
          className="absolute bottom-5 left-0 right-0 text-center text-s text-muted-foreground"
        >
          {EMPTY_PAGE_DRAG_AND_DROP_TEXT}
        </p>
      </CardsWrapComponent>
    </DotBackgroundDemo>
  );
};

export default EmptyPageCommunity;