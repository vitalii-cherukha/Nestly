import { MomData } from "@/lib/api/serverApi";
import React from "react";

type Props = {
  data: MomData;
};

const MomTabContent: React.FC<Props> = ({ data }) => {
  return (
    <div style={{ padding: 20 }}>
      <h3>Відчуття мами</h3>
      <p>{data.feelings.sensationDescr}</p>
      <ul>
        {data.feelings.states.map((state, idx) => (
          <li key={idx}>{state}</li>
        ))}
      </ul>

      <h4>Поради по комфорту:</h4>
      <ul>
        {data.comfortTips.map((tip, idx) => (
          <li key={idx}>
            <strong>{tip.category}:</strong> {tip.tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MomTabContent;
