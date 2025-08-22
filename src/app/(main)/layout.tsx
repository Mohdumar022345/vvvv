import AppSidebar from "@/components/AppSidebar";
import LandingPage from "@/components/landingPage/LandingPage";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth/utils";
import { UserType } from "@/types/types";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: UserType | null = await getUser();

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LandingPage />
      </div>
    );
  }

  return (
    <SidebarProvider className="h-screen w-screen">
      <AppSidebar userInfo={user} />
      {children}
    </SidebarProvider>
  );
}
