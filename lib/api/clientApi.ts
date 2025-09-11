import { api } from "./api";
import type { CreateNote, Note } from "@/types/note";
import { RegisterLoginRequest, User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  search,
  tag,
}: {
  page: number;
  search: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      perPage: 12,
      ...(tag && tag !== "All" ? { tag } : {}),
    },
  });
  return data;
}

export async function createNote(newNote: CreateNote): Promise<Note> {
  const { data } = await api.post<Note>("/notes", newNote);
  return data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export const register = async (data: RegisterLoginRequest) => {
  const res = await api.post<User>(`/auth/register`, data);
  return res.data;
};

export const login = async (data: RegisterLoginRequest) => {
  const res = await api.post<User>(`/auth/login`, data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post(`/auth/logout`);
};
type CheckSessionRequest = {
  success: boolean;
};
export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("users/me");
  return data;
};

export type updateProfileProps = {
  email: string;
  username: string;
};

export const updateProfile = async (data: updateProfileProps) => {
  const res = await api.patch<User>(`/users/me`, data);
  return res.data;
};
