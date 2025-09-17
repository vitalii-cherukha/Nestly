// import css from "./MomTipCard.module.css";

// interface MomTipCardProps {
//   data: string;
// }

// export default function MomTipCard({ data }: MomTipCardProps) {
//   return (
//     <div className={css.momTipCard}>
//       <h3 className={css.momTipCard_title}>Порада для мами</h3>
//       <p className={css.momTipCard_text}>{data}</p>
//     </div>
//   );
// }
import css from "./MomTipCard.module.css";

interface MomTipCardProps {
  momHint: string;
}

const MomTipCard = ({ momHint }: MomTipCardProps) => {
  return (
    <div className={css.momTipCard}>
      <h3 className={css.momTipCard_title}>Порада для мами</h3>
      <p className={css.momTipCard_text}>{momHint}</p>
    </div>
  );
};

export default MomTipCard;
