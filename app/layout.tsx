import Topbar from "./components/Topbar";"use client";
import "./globals.css";
import Nav from "./components/Nav";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html lang="nl">
      <body className={isHome ? "home" : ""}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
