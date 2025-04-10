
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TenantsList } from "@/components/TenantsList";
import { AddTenantDialog } from "@/components/AddTenantDialog";

export default function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTenantCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-6 space-y-6 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tenant Management</h2>
            <p className="text-muted-foreground">
              Create and manage tenant accounts for your organization.
            </p>
          </div>
          <AddTenantDialog onTenantCreated={handleTenantCreated} />
        </div>
        
        {/* This key prop forces a re-render when a tenant is added */}
        <TenantsList key={refreshTrigger} />
      </main>
    </div>
  );
}
