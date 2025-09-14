import React from "react";
import Image from "next/image";
import { BabyData } from "@/lib/api/serverApi";

type Props = {
  data: BabyData;
};

const BabyTabContent: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ padding: 20 }}>
      <h3>{data.analogy}</h3>
      <Image src={data.image} alt="Baby" width={200} height={200} />
      <ul>
        {data.description.map((desc, idx) => (
          <li key={idx}>{desc}</li>
        ))}
      </ul>
      <p>
        <strong>Цікавий факт:</strong> {data.interestingFact}
      </p>
    </div>
  );
};

export default BabyTabContent;
