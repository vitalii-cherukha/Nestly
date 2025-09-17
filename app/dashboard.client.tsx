// import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
// import MomTipCard from "@/components/MomTipCard/MomTipCard";
// import StatusBlock from "@/components/StatusBlock/StatusBlock";
// import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
// import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
// import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
// import Container from "../components/Container/Container";
// import css from "./dashboard.module.css";
// import { getCurrentUser, getGreeting } from "@/lib/api/serverApi";
// import { getPublicGreeting } from "@/lib/api/clientApi";

// const DashboardClient = async () => {
//   const user = await getCurrentUser().catch(() => null);
//   const greeting = user ? await getGreeting() : await getPublicGreeting();
//   return (
//     <Container>
//       <GreetingBlock />
//       <div className={css.desktopWrapper}>
//         <div className={css.dbcontainer}>
//           <StatusBlock data={greeting} />
//           <BabyTodayCard data={greeting.babyToday} />
//           <MomTipCard data={greeting.momHint} />
//         </div>
//         <div className={css.topPadding}>
//           <TasksReminderCard />
//           <FeelingCheckCard />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default DashboardClient;
"use client";

import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import Container from "../components/Container/Container";
import css from "./dashboard.module.css";
import { getGreeting, getPublicGreeting } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { GreetingData } from "@/types/greeting";

interface DashboardClientProps {
  authType: "private" | "public";
}

const DashboardClient = ({ authType }: DashboardClientProps) => {
  const { data, error } = useQuery<GreetingData>({
    queryKey: ["greeting", authType],
    queryFn: authType === "private" ? getGreeting : getPublicGreeting,
    refetchOnMount: false,
  });

  return (
    <Container>
      <GreetingBlock />
      {error || !data ? (
        <p> Сталась помилка під час завантаження</p>
      ) : (
        <div className={css.desktopWrapper}>
          <div className={css.dbcontainer}>
            <StatusBlock
              curWeekToPregnant={data.curWeekToPregnant}
              daysBeforePregnant={data.daysBeforePregnant}
            />
            <BabyTodayCard babyToday={data.babyToday} />
            <MomTipCard momHint={data.momHint} />
          </div>
          <div className={css.topPadding}>
            <TasksReminderCard />
            <FeelingCheckCard />
          </div>
        </div>
      )}
    </Container>
  );
};

export default DashboardClient;
