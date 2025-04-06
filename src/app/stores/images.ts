import { create } from "zustand";

interface useUploadImageStore {
    imageState: File | null,
    setImage: (state: File | null) => void
}

export const useUploadImageStore = create<useUploadImageStore>((set) => ({
    imageState: null,
    setImage: (state) => set({imageState: state})
}));
