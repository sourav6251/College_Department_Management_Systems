import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Home,
    ChevronLeft,
    ChevronRight,
    UsersRound,
    Users,
    Settings,
    Calendar,
    MessageSquare,
    BarChart3,
    HelpCircle,
    BookOpen,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ icon: Icon, label, isCollapsed, link }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                `w-full flex flex-row h-10 items-center justify-start rounded-md ${
                    isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                } ${isCollapsed ? "justify-center rounded-lg" : "px-5"}`
            }
            to={link}
        >
            <Icon className="h-5 w-5 mr-2 text-xl" size={24} />
            {!isCollapsed && <span>{label}</span>}
        </NavLink>
    );
};

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isDarkMode } = useAppSelector((state) => state.theme);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sidebarVariants = {
        expanded: { width: 240 },
        collapsed: { width: 80 },
    };

    return (
        <motion.div
            variants={sidebarVariants}
            initial={false}
            animate={isCollapsed ? "collapsed" : "expanded"}
            transition={{ duration: 0.3 }}
            className="h-screen sticky top-0 z-30 bg-sidebar border-r border-sidebar-border flex flex-col"
        >
            <div className="flex items-center justify-between px-4 h-16">
                <motion.div
                    initial={false}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`font-semibold text-xl ${
                        isCollapsed ? "hidden" : "block"
                    }`}
                >
                    <div className="flex gap-1 items-end justify-center">
                        PBC Online{" "}
                        <div className="h-2 w-2 mb-1 bg-green-500 rounded-full"></div>
                    </div>
                </motion.div>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {isCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <Separator className="bg-sidebar-border" />

            <div className="flex-1 overflow-auto p-3 flex flex-col gap-1">
                <SidebarLink
                    icon={Home}
                    label="Dashboard"
                    isActive={true}
                    isCollapsed={isCollapsed}
                    link={"/"}
                />
                <SidebarLink
                    icon={UsersRound}
                    label="Member"
                    isCollapsed={isCollapsed}
                    link={"/member"}
                />
                <SidebarLink
                    icon={BookOpen}
                    label="Syllabus"
                    isCollapsed={isCollapsed}
                    link={"/syllabus"}
                />
                <SidebarLink
                    icon={Users}
                    label="Customers"
                    isCollapsed={isCollapsed}
                    link={"/customers"}
                />
                <SidebarLink
                    icon={BarChart3}
                    label="Reports"
                    isCollapsed={isCollapsed}
                    link={"/reports"}
                />
                <SidebarLink
                    icon={Calendar}
                    label="Routines"
                    isCollapsed={isCollapsed}
                    link={"/routines"}
                />
                <SidebarLink
                    icon={MessageSquare}
                    label="Meetings"
                    isCollapsed={isCollapsed}
                    link={"/meetings"}
                />

                <div
                    className={`mt-auto flex flex-col gap-1 ${
                        isCollapsed ? "" : "pt-4"
                    }`}
                >
                    <SidebarLink
                        icon={Settings}
                        label="Settings"
                        isCollapsed={isCollapsed}
                        link={"/settings"}
                    />
                    <SidebarLink
                        icon={HelpCircle}
                        label="Help"
                        isCollapsed={isCollapsed}
                        link={"/help"}
                    />
                </div>
            </div>
        </motion.div>
    );
}
