import { getNav } from "@/lib/data";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";


const HEADER_H = 52;

export default function Shell({ children }: { children: React.ReactNode }) {
  const nav = getNav();


  return (
    <div className="min-h-screen">
      <Header nav={nav} />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
          {/* Sticky sidebar (desktop) */}
          <aside
            className="hidden md:block"
            style={{
              position: "sticky",
              top: HEADER_H,
              height: `calc(100vh - ${HEADER_H}px)`,
              overflowY: "auto",
            }}
          >
            <Sidebar />
          </aside>

          {/* Sidebar (mobile) */}
          <aside className="block md:hidden">
            <Sidebar />
          </aside>

          {/* Content */}
          <main className="px-6 py-10">
            <div className="mx-auto max-w-3xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
