import { Header } from "@/components/header";
import { SideBar } from "@/components/side-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
        {/* <SideBar /> */}
        
        <Header />
        <div>
        <SideBar />
        <main>
            {children}
        </main>
        </div>
    </div>
  );
}