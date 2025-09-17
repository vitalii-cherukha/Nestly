"use client";
import css from "./loading.module.css";
import Image from "next/image";
// import BabyGif from "./baby.gif";
import BabyGif from "./baby.gif";

export default function loading() {
  return (
    <div className={css.loadingBackdrop}>
      <div className={css.loader}>
        <Image src={BabyGif} alt="baby" width={300} height={300} />
      </div>
    </div>
  );
}
