"use client";

import { useEffect, useState } from "react";
import css from "./TasksReminderCard.module.css";

import "izitoast/dist/css/iziToast.min.css";
import { getTasks } from "@/lib/api/clientApi";
import { Task } from "@/types/task";
import { updateTaskById } from "@/lib/api/clientApi";
// import { AddTaskModal } from '@/components/AddDiaryEntryModal'

// ! ІКОНКА ДОДАВАННЯ + ЧЕКБОКС, ЗАМІНИТИ ПРИ ПОТРЕБІ, ІКОНКА ВІД САШІ ЗАМАЛА.
import { FiPlusCircle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { useAuthStore } from "@/lib/store/authStore";

export default function TasksReminderCard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [tasksCollection, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = await getTasks();
        setTasks(tasksCollection.tasks);
      } catch {
        import("izitoast").then((iziToast) => {
          iziToast.default.error({
            title: "Error",
            message: "Error while fetching tasks",
          });
        });
      }
    };
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);
  const onCheck = async (_id: string, isDone: { isDone: boolean }) => {
    try {
      const tasksCollection = await updateTaskById(_id, isDone);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === _id ? { ...task, isDone: tasksCollection.isDone } : task
        )
      );
    } catch {
      import("izitoast").then((iziToast) => {
        iziToast.default.error({
          title: "Error",
          message: "Error while completing the task",
        });
      });
    }
  };

  return (
    <div className={css.tasksReminderCard}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>Важливі завдання </h2>
        <button type="button" className={css.addButton}>
          <FiPlusCircle
            className="addButtonIcon"
            size={22}
            onClick={() => setModal(true)}
          />{" "}
        </button>
      </div>
      <ul className={css.taskList}>
        {tasksCollection &&
          tasksCollection.map(({ _id, name, date, isDone }) => {
            return (
              <li key={_id}>
                <div className={css.dateWrapper}>{date}</div>

                <label className={css.taskLabel}>
                  <div
                    className={`${css.customCheckbox} ${isDone ? css.customCheckboxChecked : ""}`}
                  >
                    <FaCheck
                      className={css.checkIcon}
                      size={12}
                      fill={isDone ? "#FFFFFF" : "transparent"}
                    />
                  </div>
                  <input
                    className={css.taskCheck}
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {
                      onCheck(_id, { isDone: !isDone });
                    }}
                  />
                  <span
                    className={`${css.taskName} ${isDone ? css.taskNameChecked : ""}`}
                  >
                    {name}
                  </span>
                </label>
              </li>
            );
          })}
      </ul>
      {/* {modalOpen && <AddTaskModal setModal={setModal} />} */}
    </div>
  );
}
