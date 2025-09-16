"use client";

import { usePathname } from "next/navigation";
import Container from "../Container/Container";
import css from "./Breadcrumbs.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Breadcrumbs() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div>
      <Container>
        <div className={css.breadcrumbs}>
          <p className={css.breadcrumbsText}>Breadcrumbs </p>
          <MdKeyboardArrowRight size={24} />
          <p className={css.breadcrumbsText}>under </p>
          <MdKeyboardArrowRight size={24} />
          <p className={css.breadcrumbsTextLast}>construction...</p>
        </div>
      </Container>
    </div>
  );
}
