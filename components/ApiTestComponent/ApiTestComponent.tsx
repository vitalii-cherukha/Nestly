"use client";

import { useEffect } from "react";
import * as clientApi from "@/lib/api/clientApi";

export default function ApiTestComponent() {
  useEffect(() => {
    async function testApis() {
      try {
        const profile = await clientApi.getProfile();
        console.log("profile:", profile);
        //        console.log("=== Testing APIs ===");
        //
        //        // AUTH
        //        await clientApi
        //          .register({
        //            name: "Test",
        //            email: "test2@example.com",
        //            password: "12345612",
        //          })
        //          .catch(() => console.log("register skipped"));
        //        const user = await clientApi.login({
        //          email: "test2@example.com",
        //          password: "12345612",
        //        });
        //        console.log("login:", user);
        //
        //        await clientApi.checkSession().then(() => console.log("session ok"));
        //        await clientApi.logout().then(() => console.log("logout ok"));
        //        const user2 = await clientApi.login({
        //          email: "test2@example.com",
        //          password: "12345612",
        //        });
        //        console.log("login:", user2);
        //        // PROFILE
        //        const profile = await clientApi.getProfile();
        //        console.log("profile:", profile);
        //
        //        const updatedProfile = await clientApi.updateProfile({
        //          name: "Updated Name",
        //        });
        //        console.log("updatedProfile:", updatedProfile);
        //
        //        // TASKS
        //        const tasks = await clientApi.getTasks({ page: 1, limit: 5 });
        //        console.log("tasks:", tasks);
        //
        //        if (tasks.tasks.length) {
        //          const updatedTask = await clientApi.updateTaskById(
        //            tasks.tasks[0]._id,
        //            { isDone: true },
        //          );
        //          console.log("updateTaskById:", updatedTask);
        //        }

        //        const newTask = await clientApi.createTask({
        //          name: "Test Task",
        //          date: "2025-09-13",
        //        });
        //        console.log("createTask:", newTask);
        //
        //        // DIARY
        //        const diary = await clientApi.getDiaryEntries({ page: 1, limit: 5 });
        //        console.log("diary:", diary);
        //
        //        // EMOTIONS
        //        const emotions = await clientApi.getEmotions({ page: 1, limit: 5 });
        //        console.log("emotions:", emotions);
        //
        //        if (diary.diaryNotes.length) {
        //          console.log(diary.diaryNotes[0]._id);
        //
        //          //          //!НЕ ПРАЦЮЄ НА БЕКЕНДІ
        //          //          const updatedDiary = await clientApi.updateDiaryEntry(
        //          //            diary.diaryNotes[0]._id,
        //          //            { title: "Updated Diary" },
        //          //          );
        //          //          console.log("updateDiaryEntry:", updatedDiary);
        //
        //          const deletedDiary = await clientApi.deleteDiaryEntry(
        //            diary.diaryNotes[0]._id,
        //          );
        //          console.log("deleteDiaryEntry:", deletedDiary);
        //        }
        //
        //        const newDiary = await clientApi.createDiaryEntry({
        //          title: "New Note",
        //          description: "Test description",
        //          emotions: ["6895bd86a5c677999ed2ae16"],
        //        });
        //        console.log("createDiaryEntry:", newDiary);
        //
        //        // WEEKS
        //        const weekGreeting = await clientApi.getWeekGreeting();
        //        console.log("weekGreeting:", weekGreeting);
        //
        //        const weekGreetingPublic = await clientApi.getWeekGreetingPublic();
        //        console.log("weekGreetingPublic:", weekGreetingPublic);
        //
        //        //   !!! ВИДАЄ ПОМИЛКУ 500 НА СЕРВЕРІ??
        //        // const weekBabyInfo = await clientApi.getWeekBabyInfo();
        //        // console.log("weekBabyInfo:", weekBabyInfo);
        //
        //        // const weekMomInfo = await clientApi.getWeekMomInfo();
        //        // console.log("weekMomInfo:", weekMomInfo);
      } catch (err) {
        console.error("API test error:", err);
      }
    }

    testApis();
  }, []);

  return <div>Check console for API test results.</div>;
}
