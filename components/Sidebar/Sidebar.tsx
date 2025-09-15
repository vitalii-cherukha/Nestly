"use client";

import { useSidebar } from "@/lib/store/sidebarStore";
import css from "./Sidebar.module.css";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";

export default function Sidebar() {
  const { open, close } = useSidebar();

  // Lock scroll for mobile modal mode
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`${css.backdrop} ${open ? css.show : ""}`}
        onClick={close}
        aria-hidden="true"
      ></div>
      <aside
        id="app-sidebar"
        className={`${css.sidebar} ${open ? css.open : ""}`}
        area-label="Sidebar navigation"
      >
        <div className={css.sidebarHeader}>
          <Link href="/">
            <Image src="/logo.svg" width={105} height={45} alt="Logo" />
          </Link>
          <button className={css.sidebarCloseBtn} type="button">
            <IoIosClose size={32} />
          </button>
        </div>
        <p>Sidebar contents here</p>
      </aside>
    </>
  );
}
