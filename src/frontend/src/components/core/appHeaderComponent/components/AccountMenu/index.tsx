import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import { useLogout } from "@/controllers/API/queries/auth";
import { CustomProfileIcon } from "@/customization/components/custom-profile-icon";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useAuthStore from "@/stores/authStore";
import { useDarkStore } from "@/stores/darkStore";
import { cn, stripReleaseStageFromVersion } from "@/utils/utils";
import {
  HeaderMenu,
  HeaderMenuItemButton,
  HeaderMenuItems,
  HeaderMenuToggle,
} from "../HeaderMenu";
import ThemeButtons from "../ThemeButtons";

export const AccountMenu = () => {
  const navigate = useCustomNavigate();
  const { mutate: mutationLogout } = useLogout();

  const { isAdmin, autoLogin } = useAuthStore((state) => ({
    isAdmin: state.isAdmin,
    autoLogin: state.autoLogin,
  }));

  const handleLogout = () => {
    mutationLogout();
  };

  return (
    <HeaderMenu>
      <HeaderMenuToggle>
        <div
          className="h-6 w-6 rounded-lg focus-visible:outline-0"
          data-testid="user-profile-settings"
        >
          <CustomProfileIcon />
        </div>
      </HeaderMenuToggle>

      <HeaderMenuItems position="right" classNameSize="w-[260px]">
        <div className="divide-y divide-foreground/10">

   {/* Version */}
<div className="px-4 py-3">
  <div className="flex items-center justify-between text-sm">
    <span>Fuowo Version</span>
    <span className="text-xs text-muted-foreground">
      0.0.1 (Beta)
    </span>
  </div>
</div>

          {/* Navigation */}
          <div>
            <HeaderMenuItemButton onClick={() => navigate("/settings")}>
              Settings
            </HeaderMenuItemButton>

            {isAdmin && !autoLogin && (
              <HeaderMenuItemButton onClick={() => navigate("/admin")}>
                Admin
              </HeaderMenuItemButton>
            )}
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between px-4 py-2 text-sm">
            <span>Theme</span>
            <ThemeButtons />
          </div>

          {/* Logout */}
          {!autoLogin && (
            <div>
              <HeaderMenuItemButton onClick={handleLogout} icon="log-out">
                Logout
              </HeaderMenuItemButton>
            </div>
          )}
        </div>
      </HeaderMenuItems>
    </HeaderMenu>
  );
};