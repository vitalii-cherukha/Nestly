import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { User } from "@/types/user";
import { GetDiaryEntriesRep, Note } from "@/types/note";

export interface FetchNotesProps {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (
  params: FetchNotesProps
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getDiaryListServer = async (): Promise<GetDiaryEntriesRep> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<GetDiaryEntriesRep>("/diary", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
export const checkServerSession = async () => {
  const cookieStore = await cookies();
  return await nextServer.get(`/auth/session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/users/current`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export type BabyData = {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
};

export const getWeekInfoBaby = async ({
  weekNumber,
}: {
  weekNumber: string;
}): Promise<BabyData> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/weeks/${weekNumber}/baby`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export type MomData = {
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: {
    category: string;
    tip: string;
  }[];
};

export const getWeekInfoMom = async ({
  weekNumber,
}: {
  weekNumber: string;
}): Promise<MomData> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get(`/weeks/${weekNumber}/mom`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
