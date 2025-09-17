// import Image from "next/image";
// import css from "./BabyTodayCard.module.css";
// import { BabyToday } from "@/types/greeting";

// interface BabyTodayCardProps {
//   data: BabyToday;
// }
// export default async function BabyTodayCard({ data }: BabyTodayCardProps) {
//   return (
//     <div className={css.babyTodayCard}>
//       <h3 className={css.babyTodayCard_title}>Малюк сьогодні</h3>
//       <div className={css.babyTodayCard_wrapper}>
//         <Image
//           src={data.image}
//           alt={data.babyActivity}
//           width={100}
//           height={100}
//           className={css.babyTodayCard_img}
//         />
//         <ul className={css.babyTodayCard_info}>
//           <li>
//             <p>
//               <span className={css.babyTodayCardWeight}>Розмір:</span>
//               Приблизно {data.babySize} см
//             </p>
//           </li>
//           <li>
//             <p>
//               <span className={css.babyTodayCardWeight}>Вага:</span> Близько
//               {data.babyWeight} грамів.
//             </p>
//           </li>
//           <li>
//             <p>
//               <span className={css.babyTodayCardWeight}>Активність:</span>
//               {data.babyActivity}
//             </p>
//           </li>
//         </ul>
//       </div>

//       <p>{data.babyDevelopment}</p>
//     </div>
//   );
// }
import Image from "next/image";
import css from "./BabyTodayCard.module.css";
import { BabyToday } from "@/types/greeting";

interface BabyTodayCardProps {
  babyToday: BabyToday;
}

const BabyTodayCard = ({ babyToday }: BabyTodayCardProps) => {
  const baby = babyToday;

  return (
    <div className={css.babyTodayCard}>
      <h3 className={css.babyTodayCard_title}>Малюк сьогодні</h3>
      <div className={css.babyTodayCard_wrapper}>
        <Image
          src={baby.image}
          alt={baby.babyActivity}
          width={257}
          height={194}
          className={css.babyTodayCard_img}
        />
        <ul className={css.babyTodayCard_info}>
          <li>
            <p className={css.text}>
              <span className={css.babyTodayCardWeight}>Розмір: </span>
              Приблизно {baby.babySize} см
            </p>
          </li>
          <li>
            <p className={css.text}>
              <span className={css.babyTodayCardWeight}>Вага: </span>
              Близько {baby.babyWeight} грамів.
            </p>
          </li>
          <li>
            <p className={css.text}>
              <span className={css.babyTodayCardWeight}>Активність: </span>
              {baby.babyActivity}
            </p>
          </li>
        </ul>
      </div>
      <p className={css.text}>{baby.babyDevelopment}</p>
    </div>
  );
};

export default BabyTodayCard;
