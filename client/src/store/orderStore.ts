import { create } from 'zustand';
import type { OrderDetails } from '../types';

interface OrderDraft extends Partial<OrderDetails> {
  productSlug?: string;
}

interface OrderState {
  draft: OrderDraft;
  setDraft: (draft: OrderDraft) => void;
  updateDraft: (partial: Partial<OrderDraft>) => void;
  clearDraft: () => void;
}

const initialDraft: OrderDraft = {};

export const useOrderStore = create<OrderState>((set) => ({
  draft: initialDraft,
  setDraft: (draft) => set({ draft }),
  updateDraft: (partial) => set((s) => ({ draft: { ...s.draft, ...partial } })),
  clearDraft: () => set({ draft: initialDraft }),
}));
