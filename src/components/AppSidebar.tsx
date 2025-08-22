import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PenSquareIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserType } from "@/types/types";

const MenuOptions = [{ title: "New Chat", icon: PenSquareIcon, path: "/" }];

interface AppSidebarProps {
  userInfo: UserType;
}

export default function AppSidebar({ userInfo }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-center p-4 select-none">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Reseach-o-Bot
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {MenuOptions.map((option) => (
                <SidebarMenuItem key={option.title}>
                  <SidebarMenuButton asChild className="py-5 px-2">
                    <Link href={option.path}>
                      <div className="flex text-base font-semibold items-center gap-2">
                        <option.icon className="size-5" />
                        {option.title}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex flex-row items-center gap-2 h-12 px-2"
            >
              <div className="flex items-center justify-center">
                
              </div>
              <div className="flex flex-col w-full items-start justify-start">
                <span className="text-sm font-medium">{userInfo.name}</span>
                <span className="text-xs text-muted-foreground">{userInfo.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
