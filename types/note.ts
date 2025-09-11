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
