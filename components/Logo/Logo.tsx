import Image from "next/image";
import Link from "next/link";
import React from "react";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <>
      <div className={css.logo}>
        <Link href="/" aria-label="Home" className={css.logoLink}>
          <Image
            src="/logo.svg"
            alt="Лелека"
            width={105}
            height={45}
            priority
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;
