import { Header } from "@/components/header";
import { SideBar } from "@/components/side-bar";

export default function ClientLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <div className="flex h-full bg-white">
            <SideBar />
            <main className="flex flex-col border w-full">
            <Header />
                {children}
            </main>
        </div>

    )
}