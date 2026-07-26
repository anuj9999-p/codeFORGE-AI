import { DashboardSidebar } from "@/components/features/dashboard/sidebar";
import { DashboardTopbar } from "@/components/features/dashboard/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-graphite-950">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardTopbar />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
