import React, { type ReactElement, type ReactNode } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps): ReactElement {
  return (
    <>
      <Navbar />
      <div className="relative text-muted bg-tarantula max-h-screen-4rem md:max-h-screen-5rem overflow-y-scroll">
        <main className="min-h-screen-4rem md:min-h-screen-5rem flex flex-col relative max-w-7xl mx-auto py-4">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
