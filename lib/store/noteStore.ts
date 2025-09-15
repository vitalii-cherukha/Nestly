import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteFormZustandStore, initialDraft, CreateNote } from "@/types/note";

export const useCreateNewNoteFormStore = create<NoteFormZustandStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft: CreateNote) => set(() => ({ draft })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "diary-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
