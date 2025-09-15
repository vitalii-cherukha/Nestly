import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import Container from "../Container/Container";
import css from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Container>
        <nav className={css.headerNav}>
          <Link href="/">
            <Image src="/logo.svg" width={84} height={36} alt="Logo" />
          </Link>
          <button type="button" className={css.burgerBtn}>
            <GiHamburgerMenu />
          </button>
        </nav>
      </Container>
    </div>
  );
}
