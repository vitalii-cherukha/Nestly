"use client";

import { useSidebar } from "@/lib/store/sidebarStore";
import css from "./Sidebar.module.css";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { BsCalendar2Event } from "react-icons/bs";
import { LuRoute } from "react-icons/lu";
import { TbBook2 } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";

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
          <button className={css.sidebarCloseBtn} type="button" onClick={close}>
            <IoIosClose size={32} />
          </button>
        </div>
        <ul className={css.menuList}>
          <li className={css.menuListItem}>
            <BsCalendar2Event size={24} />
            Мій день
          </li>
          <li className={css.menuListItem}>
            <LuRoute size={24} />
            Подорож
          </li>
          <li className={css.menuListItem}>
            <TbBook2 size={24} />
            Щоденник
          </li>
          <li className={css.menuListItem}>
            <RxAvatar size={24} />
            Профіль
          </li>
        </ul>
      </aside>
    </>
  );
}
