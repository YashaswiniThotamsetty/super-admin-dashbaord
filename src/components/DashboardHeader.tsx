
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex-1">
          <h1 className="text-lg md:text-2xl font-semibold">Tenant Management System</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{user?.name || 'Super Admin'}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
