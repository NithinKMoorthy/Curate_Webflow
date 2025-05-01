// import "./globals.css";
import SideBar from './SideBar/page';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
        {children}
    </div>
  );
}
