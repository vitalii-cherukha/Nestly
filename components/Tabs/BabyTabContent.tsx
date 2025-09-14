import React from "react";
import Image from "next/image";
import { BabyData } from "@/lib/api/serverApi";
import clsx from "clsx";
import css from "./Tabs.module.css";
import { FaRegStar } from "react-icons/fa";

type Props = {
  data: BabyData;
};

const BabyTabContent: React.FC<Props> = ({ data }) => {
  console.log("data", data);
  return (
    <div className={clsx(css["baby-container"])}>
      <div className={clsx(css["baby-img-cont"])}>
        <Image
          className={clsx(css["img"])}
          src={data.image}
          alt="Baby"
          width={200}
          height={200}
        />
        <h3 className={clsx(css["baby-title-alt"])}>{data.analogy}</h3>
      </div>
      <div className={clsx(css["baby-info-cont"])}>
        <ul className={clsx(css["baby-list"])}>
          {data.description.map((desc, idx) => (
            <li className={clsx(css["baby-item"])} key={idx}>
              {desc}
            </li>
          ))}
        </ul>
        <div className={clsx(css["baby-cont-fact"])}>
          <h3 className={clsx(css["baby-title-fact"])}>
            <FaRegStar />
            Цікавий факт тижня
          </h3>
          <p>{data.interestingFact}</p>
        </div>
      </div>
    </div>
  );
};

export default BabyTabContent;
