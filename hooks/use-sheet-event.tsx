import { create } from "zustand";

type Event = {
    id: number
    name: string
    desciption: string
    event_place_lat: string
    event_place_lon: string
    people_limit: number
    date: string
}

type EventToggle = {
    isOpen: boolean
    event: Event | null
    onOpen: () => void;
    onClose: () => void;
    onOpenSetEvent: (event: Event) => void;
    clearEvent: () => void;
}

export const useSheetEvent = create<EventToggle>((set) => ({
    isOpen: false,
    event: null,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenSetEvent: (event) => set({ isOpen: true, event }),
    clearEvent: () => set({ event: undefined })
}))