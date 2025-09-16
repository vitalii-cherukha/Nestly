"use client";
import React from "react";
import css from "./Loader.module.css";
import Lottie from "lottie-react";
import BabyLoader from "./baby.json";

interface Props {
  styles?: React.CSSProperties;
}

export default function Loader({ styles }: Props) {
  return (
    <div style={styles} className={css.loader}>
      <Lottie animationData={BabyLoader} loop autoplay />
    </div>
  );
}
