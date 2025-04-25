// Creating this file since it's required in the Index.jsx but wasn't in the included files
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useThemeStore, useDashboardStore } from "@/store";
import { Moon, Sun, Bell, Search, User } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const { theme, toggleTheme } = useThemeStore();
    const { notifications } = useDashboardStore();
    const isDarkMode = theme === "dark";

    const { user } = useAuthStore();

    const handleToggleTheme = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <header className="border-b border-border h-16 px-4 flex items-center justify-between bg-background">
            <div className="flex items-center">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-64 h-9 rounded-md bg-background border border-input px-8 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleTheme}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="flex items-center justify-center"
                        asChild
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full border border-gray-500 overflow-hidden"
                            aria-label="User profile"
                        >
                            {user?.profile_pic?.url ? (
                                <img src={user?.profile_pic?.url} />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{user?.name}</DropdownMenuItem>
                        <DropdownMenuItem className="capitalize">
                            {user?.role}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
