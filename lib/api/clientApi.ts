import { nextServer } from "./api";
import { User } from "@/types/user";
import { DiaryEntry, GetDiaryEntriesRep } from "@/types/note";
import type { Task } from "@/types/task";

interface GetTasksRep {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}
interface UpdateTaskByIdRep {
  isDone: boolean;
}

interface DeleteDiaryEntryRep {
  _id: string;
}
interface GetWeekGreetingRep {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: {
    babySize: number;
    babyWeight: number;
    babyActivity: string;
    babyDevelopment: string;
    image: string;
  };
  momHint: string;
}

interface GetWeekBabyInfoRep {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
}
interface GetEmotionsRep {
  emotions: { _id: string; name: string }[];
  totalCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

interface GetWeekMomInfoRep {
  feelings: { states: string[]; sensationDescr: string };
  comfortTips: { category: string; tip: string }[];
}

// ? AUTH ENDPOINTS

export const register = async (body: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  const { data } = await nextServer.post<void>("/auth/register", body);
  return data;
};

export const login = async (body: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", body);
  return data;
};

export const logout = async (): Promise<void> => {
  const { data } = await nextServer.post<void>("/auth/logout");
  return data;
};

interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

// ? Profile

export const getProfile = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/current");
  return data;
};

export const updateProfile = async (body: {
  name?: string;
  avatarUrl?: string;
  email?: string;
  dueDate?: string;
  babyGender?: string;
}) => {
  const { data } = await nextServer.patch<User>("/users/current", body);
  return data;
};

export const updateAvatar = async (avatar: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  const res = await nextServer.patch<User>("/users/current/avatars", formData);
  return res.data;
};

// ? TASK ENDPOINTS

export const getTasks = async (params?: {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
}): Promise<GetTasksRep> => {
  const { data } = await nextServer.get<GetTasksRep>("/tasks", { params });
  return data;
};

export const updateTaskById = async (
  taskId: string,
  body: { isDone: boolean }
): Promise<UpdateTaskByIdRep> => {
  const { data } = await nextServer.patch<UpdateTaskByIdRep>(
    `/tasks/status/${taskId}`,
    body
  );
  return data;
};

export const createTask = async (body: {
  name: string;
  date: string;
}): Promise<Task> => {
  const { data } = await nextServer.post<Task>("/tasks", body);
  return data;
};

// ? Diary endpoints

export const createDiaryEntry = async (body: {
  title: string;
  description: string;
  emotions: string[];
}): Promise<DiaryEntry> => {
  const { data } = await nextServer.post<DiaryEntry>("/diary", body);
  return data;
};

export const getDiaryEntries = async (params?: {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
}): Promise<GetDiaryEntriesRep> => {
  const { data } = await nextServer.get<GetDiaryEntriesRep>("/diary", {
    params,
  });
  return data;
};

export const updateDiaryEntry = async (
  noteId: string,
  body: { title: string; description: string; emotions: string[] }
): Promise<DiaryEntry> => {
  const { data } = await nextServer.patch<DiaryEntry>(`/diary/${noteId}`, body);
  return data;
};
export const deleteDiaryEntry = async (
  noteId: string
): Promise<DeleteDiaryEntryRep> => {
  const { data } = await nextServer.delete<DeleteDiaryEntryRep>(
    `/diary/${noteId}`
  );
  return data;
};
export async function fetchDiaryById(noteId: string): Promise<DiaryEntry> {
  const { data } = await nextServer.get<DiaryEntry>(`/diary/${noteId}`);
  return data;
}
// ? Weeks endpoints

export const getWeekGreeting = async (): Promise<GetWeekGreetingRep> => {
  const { data } = await nextServer.get<GetWeekGreetingRep>("/weeks/greeting");
  return data;
};

export const getWeekGreetingPublic = async (): Promise<GetWeekGreetingRep> => {
  const { data } = await nextServer.get<GetWeekGreetingRep>(
    "/weeks/greeting/public"
  );
  return data;
};

export const getWeekBabyInfo = async (
  weekNumber: string
): Promise<GetWeekBabyInfoRep> => {
  const { data } = await nextServer.get<GetWeekBabyInfoRep>(
    `/weeks/${weekNumber}/baby`
  );
  return data;
};

export const getWeekMomInfo = async (
  weekNumber: string
): Promise<GetWeekMomInfoRep> => {
  const { data } = await nextServer.get<GetWeekMomInfoRep>(
    `/weeks/${weekNumber}/mom`
  );
  return data;
};

// ? Emotions endpoints

export const getEmotions = async (params?: {
  page?: number;
  limit?: number;
}): Promise<GetEmotionsRep> => {
  const { data } = await nextServer.get("/emotions", { params });
  return data;
};
