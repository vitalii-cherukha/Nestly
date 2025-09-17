"use client";

import css from "./layout.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={css.layout}>
      <div className={css.sidebarWrap}>
        <Sidebar />
      </div>
      <main className={css.main}>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
};

export default LayoutClient;
