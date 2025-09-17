// import { GreetingData } from "@/types/greeting";
// import css from "./StatusBlock.module.css";

// interface StatusProps {
//   data: GreetingData;
// }
// const StatusBlock = ({ data }: StatusProps) => {

//   return (
//     <ul className={css.list}>
//       <li className={css.item}>
//         <h4 className={css.title}>Тиждень</h4>
//         <p className={css.text}>{data?.curWeekToPregnant}</p>
//       </li>
//       <li className={css.item}>
//         <h4 className={css.title}>Днів до зустрічі</h4>
//         <p className={css.text}>~{data?.daysBeforePregnant}</p>
//       </li>
//     </ul>
//   );
// };

// export default StatusBlock;
import css from "./StatusBlock.module.css";

interface StatusBlockProps {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
}

const StatusBlock = ({
  curWeekToPregnant,
  daysBeforePregnant,
}: StatusBlockProps) => {
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <h4 className={css.title}>Тиждень</h4>
        <p className={css.text}>{curWeekToPregnant}</p>
      </li>
      <li className={css.item}>
        <h4 className={css.title}>Днів до зустрічі</h4>
        <p className={css.text}>~{daysBeforePregnant}</p>
      </li>
    </ul>
  );
};

export default StatusBlock;
