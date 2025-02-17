// import "./globals.css";
import SideBar from './SideBar/page';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Fixed Width) */}
      <div className="bg-white shadow-md">
        <SideBar />
      </div>

      {/* Main Content (Takes Up Remaining Space) */}
      <div className="flex-1  overflow-auto">
        {children}
      </div>
    </div>
  );
}
