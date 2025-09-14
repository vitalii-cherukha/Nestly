import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import css from "./dashboard.module.css";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";

const DashboardClient = async () => {
  return (
    <div className={css.dbcontainer}>
      <div>
        <StatusBlock />
        <BabyTodayCard />
        <MomTipCard />
      </div>
      <div>
        <TasksReminderCard />
        <FeelingCheckCard />
      </div>
    </div>
  );
};

export default DashboardClient;
