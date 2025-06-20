
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Book, FileText, TrendingUp, LayoutDashboard } from "lucide-react";
import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider defaultOpen={true}>
        <DashboardSidebar />
        <SidebarInset className="p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <SidebarTrigger />
            </div>
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MentoraX</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Cours">
                  <Link to="/dashboard/cours">
                    <Book />
                    <span>Cours</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Évaluations">
                  <Link to="/dashboard/evaluations">
                    <FileText />
                    <span>Évaluations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Progression">
                  <Link to="/dashboard/progression">
                    <TrendingUp />
                    <span>Progression</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Admin">
                  <Link to="/dashboard/admin">
                    <LayoutDashboard />
                    <span>Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Dashboard;
