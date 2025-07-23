import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <SidebarInset>
            <Outlet />
            {/* <Toaster /> */}
          </SidebarInset>
        </main>
      </SidebarProvider>
    </div>
  );
};
