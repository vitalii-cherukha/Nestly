import { api } from "./api";
// import type { CreateNote, Note } from "@/types/note";
import { User } from "@/types/user";

// interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export async function fetchNotes({
//   page,
//   search,
//   tag,
// }: {
//   page: number;
//   search: string;
//   tag?: string;
// }): Promise<FetchNotesResponse> {
//   const { data } = await api.get<FetchNotesResponse>("/notes", {
//     params: {
//       page,
//       search,
//       perPage: 12,
//       ...(tag && tag !== "All" ? { tag } : {}),
//     },
//   });
//   return data;
// }

// export async function createNote(newNote: CreateNote): Promise<Note> {
//   const { data } = await api.post<Note>("/notes", newNote);
//   return data;
// }
// export async function fetchNoteById(id: string): Promise<Note> {
//   const { data } = await api.get<Note>(`/notes/${id}`);
//   return data;
// }

// export async function deleteNote(id: string): Promise<Note> {
//   const { data } = await api.delete<Note>(`/notes/${id}`);
//   return data;
// }

// export const register = async (data: RegisterLoginRequest) => {
//   const res = await api.post<User>(`/auth/register`, data);
//   return res.data;
// };

// export const login = async (data: RegisterLoginRequest) => {
//   const res = await api.post<User>(`/auth/login`, data);
//   return res.data;
// };

// export const logout = async (): Promise<void> => {
//   await api.post(`/auth/logout`);
// };
// type CheckSessionRequest = {
//   success: boolean;
// };
// export const checkSession = async () => {
//   const res = await api.get<CheckSessionRequest>("/auth/session");
//   return res.data.success;
// };

// export const getMe = async () => {
//   const { data } = await api.get<User>("users/me");
//   return data;
// };

// export type updateProfileProps = {
//   email: string;
//   username: string;
// };

// export const updateProfile = async (data: updateProfileProps) => {
//   const res = await api.patch<User>(`/users/me`, data);
//   return res.data;
// };

// !!!!!! NEW APIS

interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}
interface GetTasksRep {
  tasks: Task[];
  totalCount: number;
  totalPages: number;
  page: number;
}
interface UpdateTaskByIdRep {
  isDone: boolean;
}
interface DiaryEntry {
  _id: string;
  title: string;
  date: string;
  emotions: { _id: string; title: string }[];
  description: string;
}
interface GetDiaryEntriesRep {
  diaryNotes: DiaryEntry[];
  totalCount: number;
  totalPages: number;
  page: number;
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
  const { data } = await api.post<void>("/auth/register", body);
  return data;
};

export const login = async (body: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", body);
  return data;
};

export const logout = async (): Promise<void> => {
  const { data } = await api.post<void>("/auth/logout");
  return data;
};

interface CheckSessionRequest {
  success: boolean;
}

export const checkSession = async () => {
  const { data } = await api.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

// ? Profile

export const getProfile = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/current");
  return data;
};

export const updateProfile = async (body: {
  name?: string;
  avatarUrl?: string;
  email?: string;
  dueDate?: string;
  babyGender?: string;
}) => {
  const { data } = await api.patch<User>("/users/current", body);
  return data;
};

export const updateAvatar = async (avatar: File): Promise<User> => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  const res = await api.patch<User>("/users/current/avatars", formData);
  return res.data;
};

// ? TASK ENDPOINTS

export const getTasks = async (params?: {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
}): Promise<GetTasksRep> => {
  const { data } = await api.get<GetTasksRep>("/tasks", { params });
  return data;
};

export const updateTaskById = async (
  taskId: string,
  body: { isDone: boolean },
): Promise<UpdateTaskByIdRep> => {
  const { data } = await api.patch<UpdateTaskByIdRep>(
    `/tasks/status/${taskId}`,
    body,
  );
  return data;
};

export const createTask = async (body: {
  name: string;
  date: string;
}): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", body);
  return data;
};

// ? Diary endpoints

export const createDiaryEntry = async (body: {
  title: string;
  description: string;
  emotions: string[];
}): Promise<DiaryEntry> => {
  const { data } = await api.post<DiaryEntry>("/diary", body);
  return data;
};

export const getDiaryEntries = async (params?: {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
}): Promise<GetDiaryEntriesRep> => {
  const { data } = await api.get<GetDiaryEntriesRep>("/diary", { params });
  return data;
};

export const updateDiaryEntry = async (
  noteId: string,
  body: { title?: string; description?: string; emotions?: string[] },
): Promise<DiaryEntry> => {
  const { data } = await api.patch<DiaryEntry>(`/diary/${noteId}`, body);
  return data;
};
export const deleteDiaryEntry = async (
  noteId: string,
): Promise<DeleteDiaryEntryRep> => {
  const { data } = await api.delete<DeleteDiaryEntryRep>(`/diary/${noteId}`);
  return data;
};

// ? Weeks endpoints

export const getWeekGreeting = async (): Promise<GetWeekGreetingRep> => {
  const { data } = await api.get<GetWeekGreetingRep>("/weeks/greeting");
  return data;
};

export const getWeekGreetingPublic = async (): Promise<GetWeekGreetingRep> => {
  const { data } = await api.get<GetWeekGreetingRep>("/weeks/greeting/public");
  return data;
};

export const getWeekBabyInfo = async (
  weekNumber: string,
): Promise<GetWeekBabyInfoRep> => {
  const { data } = await api.get<GetWeekBabyInfoRep>(
    `/weeks/${weekNumber}/baby`,
  );
  return data;
};

export const getWeekMomInfo = async (
  weekNumber: string,
): Promise<GetWeekMomInfoRep> => {
  const { data } = await api.get<GetWeekMomInfoRep>(`/weeks/${weekNumber}/mom`);
  return data;
};

// ? Emotions endpoints

export const getEmotions = async (params?: {
  page?: number;
  limit?: number;
}): Promise<GetEmotionsRep> => {
  const { data } = await api.get("/emotions", { params });
  return data;
};
