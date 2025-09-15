export interface Note {
  title: string;
  description: string;
  emotions: [string];
}

export interface CreateNote {
  title: string;
  description: string;
  emotions: [string];
}

const emotionsList: string[] = [
  "Єднання",
  "Імпульсивність",
  "Інтуїція",
  "Інфантильність",
  "Апатія",
  "Апетит",
  "Бадьорість",
  "Бажання турбуватися",
  "Бажання усамітнення",
  "Байдужість",
];
export default emotionsList;

export const initialDraft: CreateNote = {
  title: "",
  description: "",
  emotions: [""],
};
export type NoteFormZustandStore = {
  draft: CreateNote;
  setDraft: (draft: CreateNote) => void;
  clearDraft: () => void;
};
export interface DiaryEntry {
  _id: string;
  title: string;
  date: string;
  emotions: { _id: string; title: string }[];
  description: string;
}

export interface GetDiaryEntriesRep {
  diaryNotes: DiaryEntry[];
  totalCount: number;
  totalPages: number;
  page: number;
}

export type SortOrder = "asc" | "desc";
