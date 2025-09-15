"use client";

import { create } from "zustand";

type SidebarState = {
  open: boolean;
  openIt: () => void;
  close: () => void;
  toggle: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  open: false,
  openIt: () => set({ open: true }),
  close: () => set({ open: false }),
  toggle: () => set((s) => ({ open: !s.open })),
}));
