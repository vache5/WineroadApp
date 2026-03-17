"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BookingModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedDate: number | null;
  setSelectedDate: (date: number | null) => void;
  adults: number;
  setAdults: (adults: number) => void;
  childrenCount: number;
  setChildrenCount: (count: number) => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <BookingModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        selectedDate,
        setSelectedDate,
        adults,
        setAdults,
        childrenCount,
        setChildrenCount,
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error(
      "useBookingModal must be used within a BookingModalProvider"
    );
  }
  return context;
}

